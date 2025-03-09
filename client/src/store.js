import { create } from "zustand";

const useVoteStore = create((set) => ({
  centers: [
    "1 saylı Bakı ASAN xidmət mərkəzi",
    "2 saylı Bakı ASAN xidmət mərkəzi",
    "3 saylı Bakı ASAN xidmət mərkəzi",
    "4 saylı Bakı ASAN xidmət mərkəzi",
    "5 saylı Bakı ASAN xidmət mərkəzi",
    "6 saylı Bakı ASAN xidmət mərkəzi",
    "7 saylı Bakı ASAN xidmət mərkəzi",
    "Sumqayıt regional ASAN xidmət mərkəzi",
    "Gəncə regional ASAN xidmət mərkəzi",
    "2 saylı Gəncə regional ASAN xidmət mərkəzi",
    "Bərdə regional ASAN xidmət mərkəzi",
    "Sabirabad regional ASAN xidmət mərkəzi",
    "Qəbələ regional ASAN xidmət mərkəzi",
    "Mingəçevir regional ASAN xidmət mərkəzi",
    "Masallı regional ASAN xidmət mərkəzi",
    "Quba regional ASAN xidmət mərkəzi",
    "İmişli regional ASAN xidmət mərkəzi",
    "Şəki regional ASAN xidmət mərkəzi",
    "Tovuz regional ASAN xidmət mərkəzi",
    "Şamaxı regional ASAN xidmət mərkəzi",
    "Balakən regional ASAN xidmət mərkəzi",
    "Kürdəmir regional ASAN xidmət mərkəzi",
    "Ağcabədi regional ASAN xidmət mərkəzi",
    "Salyan regional ASAN xidmət mərkəzi",
    "Naxçıvan regional ASAN xidmət mərkəzi",
    "Şuşa regional ASAN xidmət mərkəzi",
    "İnnovasiyalar Mərkəzi",
    "ABAD publik hüquqi şəxs",
    "ASAN Radio",
    "AKT",
    "Yaşıl ASAN",
  ],
  votes: Array(31).fill(0), // Will be fetched from the backend
  hasVoted: false,

  // Fetch the latest vote results from the backend
  fetchVotes: async () => {
    try {
      const response = await fetch("http://localhost:3000/api/results");
      if (!response.ok) throw new Error("Failed to fetch results");

      const data = await response.json();
      const newVotes = Array(31).fill(0); // Default array

      data.forEach((vote) => {
        newVotes[vote._id] = vote.count;
      });

      set({ votes: newVotes });
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  },

  // Vote function to send the vote to the backend
  vote: async (index) => {
    try {
      const response = await fetch("http://localhost:3000/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ centerId: index }),
      });

      const data = await response.json();

      if (response.ok) {
        set({ hasVoted: true });
        await useVoteStore.getState().fetchVotes(); // Refresh results
      } else {
        alert(data.error); // Show error if already voted
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Server error, please try again later.");
    }
  },
}));

export default useVoteStore;
