import { db, doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs, serverTimestamp } from "./firebase-config.js";

// 로컬 스토리지 키 관리
const STORAGE_PREFIX = 'ttalggak_';

// 고유 사용자 ID 생성 및 가져오기 (기기 식별용 UUID)
export function getUserId() {
    let userId = localStorage.getItem(STORAGE_PREFIX + 'userId');
    if (!userId) {
        // 간단한 난수 기반 UUID 생성
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem(STORAGE_PREFIX + 'userId', userId);
    }
    return userId;
}

// 저장된 닉네임 가져오기
export function getUserNickname() {
    return localStorage.getItem(STORAGE_PREFIX + 'nickname') || '';
}

// 닉네임 로컬에 저장하기
export function setUserNickname(nickname) {
    localStorage.setItem(STORAGE_PREFIX + 'nickname', nickname);
}

// 점수 서버에 등록하기
export async function submitScore(gameId, nickname, score) {
    const userId = getUserId();
    setUserNickname(nickname);

    try {
        // leaderboards_{gameId} 컬렉션에 userId를 문서 ID로 사용하여 저장
        // 이는 동일 기기(userId)에서 제출하면 문서를 덮어쓰게 하여 중복 방지 역할을 함
        const scoreRef = doc(db, `leaderboards_${gameId}`, userId);

        // 기존 문서 확인하여 더 높은 점수일 때만 갱신
        const docSnap = await getDoc(scoreRef);
        if (docSnap.exists()) {
            const existingScore = docSnap.data().score || 0;
            if (score <= existingScore) {
                console.log("기존 최고 기록에 미치지 못하여 점수를 갱신하지 않습니다.");
                return true; // 성공으로 간주하여 다음 화면으로 넘김
            }
        }

        await setDoc(scoreRef, {
            nickname: nickname,
            score: score,
            timestamp: serverTimestamp()
        }, { merge: true }); // 기존 데이터 일부 유지를 위해 merge 옵션 사용

        console.log("점수 등록 성공!");
        return true;
    } catch (error) {
        console.error("점수 등록 실패:", error);
        return false;
    }
}

// 랭킹 목록 가져오기 (Top N)
export async function getLeaderboard(gameId, limitNum = 20) {
    try {
        const scoresRef = collection(db, `leaderboards_${gameId}`);
        // 점수 내림차순 정렬
        // (주의: timestamp 복합 인덱스 설정을 피하기 위해 1차적으로 점수로만 정렬 후 클라이언트에서 2차 정렬)
        const q = query(
            scoresRef,
            orderBy('score', 'desc'),
            limit(limitNum)
        );

        const querySnapshot = await getDocs(q);
        const leaderboard = [];
        const seenNicknames = new Set();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const nickname = data.nickname ? data.nickname.trim() : '';

            if (nickname && !seenNicknames.has(nickname)) {
                seenNicknames.add(nickname);
                leaderboard.push({
                    id: doc.id,
                    ...data,
                    // serverTimestamp가 클라이언트에서 아직 null일 수 있으므로 대체값 설정
                    localTime: data.timestamp ? data.timestamp.toMillis() : Date.now()
                });
            }
        });

        // 2차 정렬: 점수가 같을 경우 타임스탬프 오름차순(먼저 달성한 사람이 위로) 정렬
        leaderboard.sort((a, b) => {
            if (a.score === b.score) {
                return a.localTime - b.localTime;
            }
            return b.score - a.score;
        });

        // 순위 매기기 (공동 순위 처리)
        let rank = 1;
        let lastScore = -1;
        let skip = 0;

        leaderboard.forEach((item, index) => {
            if (item.score === lastScore) {
                item.rank = rank;
                skip++;
            } else {
                rank = rank + skip;
                item.rank = rank;
                lastScore = item.score;
                skip = 1;
            }
        });

        return leaderboard;
    } catch (error) {
        console.error("랭킹 로드 실패:", error);
        return [];
    }
}
