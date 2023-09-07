function CheckPositionStatus(
  gk: number,
  gkNeed: number,
  player: number,
  playerNeed: number
) {
  if (gk < gkNeed) {
    if (player < playerNeed) {
      return (
        <div>
          <p>
            필드플레이어&nbsp;
            <span>
              ({player}/{playerNeed})
            </span>
          </p>
          <p>
            골키퍼&nbsp;
            <span>
              ({gk}/{gkNeed})
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            골키퍼&nbsp;
            <span>
              ({gk}/{gkNeed})
            </span>
          </p>
        </div>
      );
    }
  } else if (player < playerNeed) {
    return (
      <div>
        <p>
          필드플레이어&nbsp;
          <span>
            ({player}/{playerNeed})
          </span>
        </p>
      </div>
    );
  } else return <div>-</div>;
}

export default CheckPositionStatus;
