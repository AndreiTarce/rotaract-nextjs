const STRIPE_DEVELOPMENT_PRICES = {
    STRIPE_SIMPLE_DONATION: [
        'price_1O8OR1H1rXnXzXAphxmN3uIh',
        'price_1O8OR1H1rXnXzXAphxmN3uIh',
        'price_1O8OR1H1rXnXzXAphxmN3uIh',
        'price_1O8OR1H1rXnXzXAphxmN3uIh',
    ],

    STRIPE_RECURRING_DONATION: [
        'price_1O8qR1H1rXnXzXAp0L7rLSUk',
        'price_1O8qR1H1rXnXzXAp0L7rLSUk',
        'price_1O8qR1H1rXnXzXAp0L7rLSUk',
        'price_1O8qR1H1rXnXzXAp0L7rLSUk',
    ],

    STRIPE_GHIOZDANOK_DONATION: 'price_1PnOVYH1rXnXzXApCWHl7eDt',
    STRIPE_VEDEREDECRACIUN_DONATION: 'price_1PnOVYH1rXnXzXApCWHl7eDt',
    STRIPE_CATRAFUSALE_DONATION: 'price_1PnOVYH1rXnXzXApCWHl7eDt',
    STRIPE_HEALTHYVISION_DONATION: 'price_1PnOVYH1rXnXzXApCWHl7eDt',

    MIND_MATTERS_MINDACCESS: 'price_1OyfwSH1rXnXzXApCbHQYRpq',
    MIND_MATTERS_MINDFUEL: 'price_1OyfxoH1rXnXzXAptsqOPQCq',

    CATRAFUSALE_PACKAGES: {
        SINGLE: 'price_1PFHbyH1rXnXzXApNJslmKJj',
        DOUBLE: 'price_1PFHd7H1rXnXzXApRMfKkOCQ',
        MIXT: 'price_1PFHeKH1rXnXzXApPeRJ1aLt',
        SINGLE_TABLE: 'price_1PFHdkH1rXnXzXApjHFj8INf',
    },

    CATRAFUSALE_2024_WINTER_EDITION_PACKAGES: {
        SINGLE: 'price_1QMTJAH1rXnXzXApRFp7F6W7',
        DOUBLE: 'price_1QMTJVH1rXnXzXAphGRafiJz',
        MIXT: 'price_1QMTK2H1rXnXzXAp3vA9sGpG',
        SINGLE_TABLE: 'price_1QMTJoH1rXnXzXApfrDhMZ8N',
    },

    CATRAFUSALE_RAFFLE_TICKET: 'price_1PLR5FH1rXnXzXAp3myMbK3q',
};

const STRIPE_PRODUCTION_PRICES = {
    STRIPE_SIMPLE_DONATION: [
        'price_1O9RTzH1rXnXzXAphCRUIvcG',
        'price_1O9RUwH1rXnXzXApwrCJAIlE',
        'price_1O9RVTH1rXnXzXAporGfcIj6',
        'price_1O9RbOH1rXnXzXAplKfGiMX0',
    ],

    STRIPE_RECURRING_DONATION: [
        'price_1O9RWMH1rXnXzXAp9VgPohde',
        'price_1O9RWkH1rXnXzXApmqQP1N4A',
        'price_1O9RX3H1rXnXzXApz8AK5rua',
        'price_1O9RbmH1rXnXzXApnUPnweef',
    ],

    STRIPE_GHIOZDANOK_DONATION: 'price_1O9RYBH1rXnXzXAp7KsUAxwU',
    STRIPE_VEDEREDECRACIUN_DONATION: 'price_1O9RYwH1rXnXzXApzQEF28hQ',
    STRIPE_CATRAFUSALE_DONATION: 'price_1O9RZVH1rXnXzXApWUMewYST',
    STRIPE_HEALTHYVISION_DONATION: 'price_1O9RaOH1rXnXzXAp9f9UtTsc',

    MIND_MATTERS_MINDACCESS: 'price_1OyfwSH1rXnXzXApCbHQYRpq',
    MIND_MATTERS_MINDFUEL: 'price_1OyfxoH1rXnXzXAptsqOPQCq',

    CATRAFUSALE_PACKAGES: {
        SINGLE: 'price_1PFHbyH1rXnXzXApNJslmKJj',
        DOUBLE: 'price_1PFHd7H1rXnXzXApRMfKkOCQ',
        MIXT: 'price_1PFHeKH1rXnXzXApPeRJ1aLt',
        SINGLE_TABLE: 'price_1PFHdkH1rXnXzXApjHFj8INf',
    },

    CATRAFUSALE_2024_WINTER_EDITION_PACKAGES: {
        SINGLE: 'price_1PFHbyH1rXnXzXApNJslmKJj',
        DOUBLE: 'price_1PFHd7H1rXnXzXApRMfKkOCQ',
        MIXT: 'price_1PFHeKH1rXnXzXApPeRJ1aLt',
        SINGLE_TABLE: 'price_1PFHdkH1rXnXzXApjHFj8INf',
    },

    CATRAFUSALE_RAFFLE_TICKET: 'price_1PLR5FH1rXnXzXAp3myMbK3q',
};

const getStripePrices = () => {
    if (process.env.NODE_ENV === 'development') {
        return STRIPE_DEVELOPMENT_PRICES;
    }

    return STRIPE_PRODUCTION_PRICES;
};

export { getStripePrices };
