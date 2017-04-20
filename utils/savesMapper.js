module.exports = ({ count, rows }) => {
  return {
    count,
    rows: rows.map((item) => {
      const save = item;

      if (save.Subscriptions && save.Subscriptions.length > 0) {
        save.hasSubscribed = true;

        if (save.Subscriptions.some(s => s.Votes.length > 0)) {
          save.hasVoted = true;
        }
      }

      return save;
    })
  };
};
