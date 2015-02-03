'use strict';

function calculate() {
	// Look up the input and output elements in the document
	var amount = document.getElementById('amount'),
		apr = document.getElementById('apr'),
		years = document.getElementById('years'),
		zipcode = document.getElementById('zipcode'),
		payment = document.getElementById('payment'),
		total = document.getElementById('total'),
		totalinterest = document.getElementById('totalinterest');

	// Get the user's input from the input elements. Assume it is all valida.
	// Convert interest from a percentage to decimal, and convert from
	// annual rate to a monthly rate. Convert payment period in years
	// to the number of monthly payments.
	var principal = parseFloat(amount.value),
		interest = parseFloat(apr.value) / 100 / 12,
		payments = parseFloat(years.value) * 12;

	// Now compute the monthly payment figure.
	var x = Math.pow(1 + interest, payments),
		monthly = (principal*x*interest)/(x-1);

	// If the result is a finite number, the user's input was good and
	// we have meaningful results to display
	if(isFinite(monthly)) {
		// Fill in the output fields, rounding to 2 decimal places
		payment.innerHTML = monthly.toFixed(2);
		total.innerHTML = (monthly * payments).toFixed(2);
		totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

		// Save the user's input so we can restore it the next time they visit
		save(amount.value, apr.value, years.value, zipcode.value);

		// Advertise: find and display local lenders, but ignore network errors
		try { // catch any errors that occur within these curly braces
			getLenders(amount.value, apr.value, years.value, zipcode.value);
		}
		catch(e) { /* and ignore those errors */ }
	} else {
		// Results was not a number or infinite, which means the input was
		// incomplete or invalid, Clear any previously displayed output.

		payment.innerHTML = '';
		total.innerHTML = '';
		totalinterest.innerHTML = '';
	}
}

// Save the user's input as properties of the localStorage object.
// Those properties will still be there when the user visits in the future
// This storage feature will not work in some browsers.
function save(amount, apr, years, zipcode) {
	if (window.localStorage) {
		localStorage.loan_amount = amount;
		localStorage.loan_apr = apr;
		localStorage.loan_years = years;
		localStorage.loan_zipcode = zipcode;
	}
}

// Automatically attempt to restore input fields when document first loads.
window.onload = function() {
	// If the browser supports localStorage and we have some stored data
	if(window.localStorage && localStorage.loan_amount) {
		document.getElementById('amount').value = localStorage.loan_amount;
		document.getElementById('apr').value = localStorage.loan_apr;
		document.getElementById('years').value = localStorage.loan_years;
		document.getElementById('zipcode').value = localStorage.loan_zipcode;
	}
}