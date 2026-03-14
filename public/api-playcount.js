import { db, doc, getDoc, updateDoc, setDoc, increment } from "/firebase-config.js";

// 플레이 수 1 증가 (게임 시작 시 호출)
export async function trackPlayCount(gameId, force = false) {
    // 세션 스토리지로 중복 카운트 방지 (새로고침 시마다 오르는 것 방지)
    const sessionKey = `played_${gameId}`;
    if (!force && sessionStorage.getItem(sessionKey)) return;

    try {
        const gameRef = doc(db, "games", gameId);
        const docSnap = await getDoc(gameRef);

        if (docSnap.exists()) {
            await updateDoc(gameRef, {
                plays: increment(1)
            });
        } else {
            await setDoc(gameRef, {
                plays: 1
            });
        }
        sessionStorage.setItem(sessionKey, "true");
        console.log(`플레이 카운트 증가 완료: ${gameId}`);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

// 플레이 수 조회 (메인 페이지에서 호출)
export async function getPlayCount(gameId) {
    try {
        const gameRef = doc(db, "games", gameId);
        const docSnap = await getDoc(gameRef);

        if (docSnap.exists()) {
            return docSnap.data().plays || 0;
        } else {
            return 0; // 문서가 아직 없으면 0
        }
    } catch (e) {
        console.error("Error getting document:", e);
        return 0;
    }
}
