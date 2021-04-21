describe('tastedive api', () => {
    const datas = require('../fixtures/data')
    //CTRL A
    //CTRL K + F

    //---test Api with data set and cypress command 
    datas.forEach(d => {
        it.only('General test tastedive api with data set and cypress command : ' + d.data.q, () => {

            cy.tasteDiveSearchApi(d.data.q, d.data.type, d.data.limit).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('Similar')
                expect(response.body.Similar).to.have.property('Info')
                expect(response.body.Similar).to.have.property('Results')
                expect(response.body.Similar.Results).to.be.not.empty
                expect(response.body.Similar).to.have.not.property('gfd')

            })
        })

    })

    datas.forEach(d => {
        it.only('General test tastedive api with data set : ' + d.data.q, () => {

            cy.request(`https://tastedive.com/api/similar?q=${d.data.q}&type=${d.data.type}&limit=${d.data.limit}`)
                .then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('Similar')
                    expect(response.body.Similar).to.have.property('Info')
                    expect(response.body.Similar).to.have.property('Results')
                    expect(response.body.Similar.Results).to.be.not.empty
                    expect(response.body.Similar).to.have.not.property('gfd')
                })
        })

    })


    //--Api with params 
    it('General test tastedive api with parmas', () => {
        cy.request('https://tastedive.com/api/similar?q=movie:valeria&&limit=3')
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('Similar')
                expect(response.body.Similar).to.have.property('Info')
                expect(response.body.Similar).to.have.property('Results')
            })
    })

})
