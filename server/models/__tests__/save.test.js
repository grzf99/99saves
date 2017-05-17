import { differenceInDays, addDays, endOfDay, startOfDay } from 'date-fns';
import { Save } from '../';

beforeEach(() => Save.sync({ force: true }));
afterEach(() => Save.sync({ force: true }));

describe('title setter', () => {
  it('should set the title', () => {
    const save = Save.build({ title: 'My title' });
    expect(save.title).toEqual('My title');
  });

  it('should set the slug', () => {
    const save = Save.build({ title: 'My title' });
    expect(save.slug).toEqual('my-title');
  });
});

describe('date_end setter', () => {
  const now = new Date().toJSON();

  it('should set date_end', () => {
    const save = Save.build({ date_end: now });
    expect(save.date_end).toEqual(now);
  });

  it('should set the negotiation_end to 1 day after date_end', () => {
    const save = Save.build({ date_end: now });
    expect(
      differenceInDays(new Date(save.date_end), new Date(save.negotiation_end))
    ).toEqual(-1);
  });

  it('should set the votation_end to 2 days after date_end', () => {
    const save = Save.build({ date_end: now });
    expect(
      differenceInDays(new Date(save.date_end), new Date(save.votation_end))
    ).toEqual(-2);
  });

  it('should set the checkout_end to 4 days after date_end', () => {
    const save = Save.build({ date_end: now });
    expect(
      differenceInDays(new Date(save.date_end), new Date(save.checkout_end))
    ).toEqual(-4);
  });
});

describe('preSubscription getter', () => {
  describe('when today is before date_start', () => {
    it('should be true', () => {
      const save = Save.build({ date_start: addDays(new Date(), 2) });
      expect(save.preSubscription).toEqual(true);
    });
  });

  describe('when today is the same day as date_start', () => {
    it('should be false', () => {
      const save = Save.build({ date_start: new Date() });
      expect(save.preSubscription).toEqual(false);
    });
  });

  describe('when today is after date_start', () => {
    it('should be false', () => {
      const save = Save.build({ date_start: addDays(new Date(), -1) });
      expect(save.preSubscription).toEqual(false);
    });
  });
});

describe('subscriptionOpen getter', () => {
  describe('when today is before date_start', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), 1)),
        date_end: endOfDay(addDays(new Date(), 2))
      });
      expect(save.subscriptionOpen).toEqual(false);
    });
  });

  describe('when today is the same day as date_start', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(new Date()),
        date_end: endOfDay(addDays(new Date(), 2))
      });
      expect(save.subscriptionOpen).toEqual(true);
    });
  });

  describe('when today is between date_start and date_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -1)),
        date_end: endOfDay(addDays(new Date(), 2))
      });
      expect(save.subscriptionOpen).toEqual(true);
    });
  });

  describe('when today is the same day as date_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -1)),
        date_end: endOfDay(new Date())
      });
      expect(save.subscriptionOpen).toEqual(true);
    });
  });

  describe('when today is after date_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -2)),
        date_end: endOfDay(addDays(new Date(), -1))
      });
      expect(save.subscriptionOpen).toEqual(false);
    });
  });
});

describe('negotiationOpen getter', () => {
  describe('when today is before negotiation_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -3)),
        date_end: endOfDay(new Date())
      });
      expect(save.negotiationOpen).toEqual(false);
    });
  });

  describe('when today is the same day as negotiaton_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -2)),
        date_end: endOfDay(addDays(new Date(), -1))
      });
      expect(save.negotiationOpen).toEqual(true);
    });
  });

  describe('when today is after negotiation_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -3)),
        date_end: endOfDay(addDays(new Date(), -2))
      });
      expect(save.negotiationOpen).toEqual(false);
    });
  });
});

describe('votationOpen getter', () => {
  describe('when today is before votation_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -4)),
        date_end: endOfDay(addDays(new Date(), -1))
      });
      expect(save.votationOpen).toEqual(false);
    });
  });

  describe('when today is the same day as votation_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -2)),
        date_end: endOfDay(addDays(new Date(), -2))
      });
      expect(save.votationOpen).toEqual(true);
    });
  });

  describe('when today is after votation_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -3)),
        date_end: endOfDay(addDays(new Date(), -3))
      });
      expect(save.votationOpen).toEqual(false);
    });
  });
});

describe('checkoutOpen getter', () => {
  describe('when today is before votation_end + 1', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -3)),
        date_end: endOfDay(addDays(new Date(), -2))
      });
      expect(save.checkoutOpen).toEqual(false);
    });
  });

  describe('when today is between votation_end + 1 and checkout_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -4)),
        date_end: endOfDay(addDays(new Date(), -3))
      });
      expect(save.checkoutOpen).toEqual(true);
    });
  });

  describe('when today is the same day as checkout_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -5)),
        date_end: endOfDay(addDays(new Date(), -4))
      });
      expect(save.checkoutOpen).toEqual(true);
    });
  });

  describe('when today is after checkout_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -6)),
        date_end: endOfDay(addDays(new Date(), -5))
      });
      expect(save.checkoutOpen).toEqual(false);
    });
  });
});

describe('finished getter', () => {
  describe('when today is before checkout_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -4)),
        date_end: endOfDay(addDays(new Date(), -3))
      });
      expect(save.finished).toEqual(false);
    });
  });

  describe('when today is the same day as checkout_end', () => {
    it('should be false', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -5)),
        date_end: endOfDay(addDays(new Date(), -4))
      });
      expect(save.finished).toEqual(false);
    });
  });

  describe('when today is after checkout_end', () => {
    it('should be true', () => {
      const save = Save.build({
        date_start: startOfDay(addDays(new Date(), -6)),
        date_end: endOfDay(addDays(new Date(), -5))
      });
      expect(save.finished).toEqual(true);
    });
  });
});

describe('feedbackable scope', () => {
  it('should return all saves that are on the 10th day after finished', () =>
    Save.bulkCreate([
      {
        date_start: addDays(new Date(), -5),
        date_end: endOfDay(addDays(new Date(), -3))
      },
      {
        date_start: addDays(new Date(), -16),
        date_end: endOfDay(addDays(new Date(), -14))
      },
      {
        date_start: addDays(new Date(), -17),
        date_end: endOfDay(addDays(new Date(), -15))
      }
    ])
      .then(() => Save.scope('feedbackable').findAll())
      .then((saves) => {
        expect(saves.length).toEqual(1);
      }));
});
