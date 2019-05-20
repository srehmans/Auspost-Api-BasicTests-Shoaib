/* ToDo: Testcases to be added
             *
             * Service type Validation
             * Nagative Cases on 404
             * Empty Postcode or destination
             * Price Validations
             * */



var chakram = require('chakram');
expect = chakram.expect;

// Set the URL for the Domestic Parcel Size service

var urlPrefix = "digitalapi.auspost.com.au";

// Lookup domestic parcel types (different kinds of standard boxes etc)

/* ToDo: To be moved to data file */

var params = {
    length: 22,
    width: 16,
    height: 7.7,
    weight: 1.5,
    from_postcode: 2000,
    to_postcode: 3000
};

/* ToDo: To be moved to API Scope file */


var options = {
    headers: {
        'auth-key': 'b3ec2079-1051-4361-8076-338ea3e415e2'
    }
};

var postageTypesURL = "https://" + urlPrefix + "/postage/parcel/domestic/service.json?length=" + params.length + "&width="
    + params.width + "&height=" + params.height + "&weight=" + params.weight + "&from_postcode=" + params.from_postcode + "&to_postcode=" + params.to_postcode;

/* ToDo: To be moved to library file */
var calcShippingResult = function (postageTypesURL, options) {

    //arrange

    postageTypesURL = "https://" + urlPrefix + "/postage/parcel/domestic/service.json?length=" + params.length + "&width="
        + params.width + "&height=" + params.height + "&weight=" + params.weight + "&from_postcode=" + params.from_postcode + "&to_postcode=" + params.to_postcode;
    console.log('Endpoint created: ' + postageTypesURL);

    //act
    return chakram.get(postageTypesURL, options); //returns a Promise
};


describe("Calculate Shipping Cost - Domestic ", function () {


    it("should return status code 200 on successfull service call", function () {

        this.timeout(10000);

        calcShippingResult(postageTypesURL, options)
            .then(function (results) {

                expect(results).to.have.status(200);
                console.log("\n*****************************");
                console.log("Status Code : " + results.response.statusCode, results.response.statusMessage);
                console.log("*****************************\n");

            })
    });

    it("should return all service types", function () {

        this.timeout(10000);

        return calcShippingResult(postageTypesURL, options)
            .then(function (results) {


                expect(results).to.have.status(200);
                console.log("\n*****************************");
                for (i = 0; i < results.response.body.services.service.length; i++) {
                    console.log("Code : " + results.response.body.services.service[i].code);
                    console.log("Name : " + results.response.body.services.service[i].name);
                    console.log("Price : " + results.response.body.services.service[i].price);
                    console.log("Extra Cover : " + results.response.body.services.service[i].max_extra_cover);
                    console.log("*****************************\n");
                }


                /* ToDo: Testcases to be added
                *
                * Service type Validation
                * Nagative Cases on 404
                * Empty Postcode or destination
                * Price Validations
                * */


            });

    });
});