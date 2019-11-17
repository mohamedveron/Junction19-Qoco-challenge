'use strict'


class LuggageController {

    /**
 * Add new payment.
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async getLuggage ({ request, response }) {

  let responseData = {};


  try {

    responseData = await paymentMethodsMap.get('paypal').createPayment(request.post());


  } catch (error) {
    console.log("Add new payment Throws error.................. ", error);
    responseData = error;
  }

  response.status(200).send(responseData);
}

}

module.exports = LuggageController
