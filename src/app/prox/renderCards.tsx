export default function RenderCards({
  clickMultiplier,
}: {
  clickMultiplier: number;
}) {
  const buttonRadius = 144; // Initial button radius in px
  const baseMaxCardsPerRing = 12; // Base maximum cards per ring
  const ringSpacing = 100; // Increased spacing between rings

  // Dynamically calculate max cards per ring based on total clickMultiplier
  const calculateMaxCardsPerRing = (ringIndex: number) =>
    baseMaxCardsPerRing + ringIndex * 2;

  const renderCards = () => {
    const cards = [];
    let remainingCards = clickMultiplier;

    let currentRadius = buttonRadius;
    let ringIndex = 0;

    while (remainingCards > 0) {
      const maxCardsThisRing = calculateMaxCardsPerRing(ringIndex);
      const cardsInThisRing = Math.min(remainingCards, maxCardsThisRing);
      const angleIncrement = 360 / cardsInThisRing;

      for (let i = 0; i < cardsInThisRing; i++) {
        const angle = angleIncrement * i;
        cards.push(
          <img
            key={`${currentRadius}-${ringIndex}-${i}`}
            src="/images/id-card.svg"
            style={{
              position: "absolute",
              // Position each card around the circle
              transform: `rotate(${angle}deg) translate(${currentRadius}px)`,
              transformOrigin: "center",
            }}
            className="h-12 w-auto rounded-lg border border-orange-500 bg-orange-400 drop-shadow-lg"
          />,
        );
      }

      remainingCards -= cardsInThisRing;
      currentRadius += ringSpacing;
      ringIndex++;
    }

    return cards;
  };

  return (
    <div className="absolute inset-0 flex animate-spinCards items-center justify-center">
      {renderCards()}
    </div>
  );
}
