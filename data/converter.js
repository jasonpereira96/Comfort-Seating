//converter
const csvFilePath = 'data.csv';
const csv = require('csvtojson');

// Async / await usage
read();
async function read() {
    const jsonArray = await csv().fromFile(csvFilePath);
    var final = {
        products: jsonArray.map(record => {
            record.id = parseInt(record.id);
            record.s_baby = parseInt(record.s_baby);
            record.m_baby = parseInt(record.m_baby);
            record.xl = parseInt(record.xl)
            record.xxl = parseInt(record.xxl);
            record.xxxl = parseInt(record.xxxl);

            record.s_baby_c = parseInt(record.s_baby_c);
            record.m_baby_c = parseInt(record.m_baby_c);
            record.xl_c = parseInt(record.xl_c)
            record.xxl_c = parseInt(record.xxl_c);
            record.xxxl_c = parseInt(record.xxxl_c);
            
            return {
                id: record.id,
                name: record.name,
                description: record.description,
                status: record.status,
                prices: {
                    s_baby: {
                        price: record.s_baby,
                        cancelledPrice: record.s_baby_c
                    },
                    m_baby: {
                        price: record.m_baby,
                        cancelledPrice: record.m_baby_c
                    },
                    xl: {
                        price: record.xl,
                        cancelledPrice: record.xl_c
                    },
                    xxl: {
                        price: record.xxl,
                        cancelledPrice: record.xxl_c
                    },
                    xxxl: {
                        price: record.xxxl,
                        cancelledPrice: record.xxxl_c
                    }
                }
            };
        })
    };
    console.log(JSON.stringify(final, null, 4));
}