import useStore from "@/store";

export const useBattleStatus = () => {
   const status = useStore(state => state.status);

   const isAttacking = status === "attacking";
   const isWin = status === "win";
   const isLose = status === "lose";
   const isPlaying = status === "playing";
   const isIdle = status === "idle";

   return {
      status,
      isAttacking,
      isWin,
      isLose,
      isPlaying,
      isIdle,
   };
};
