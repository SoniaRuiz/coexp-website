/*
 * Copyright Shorif Ali (http://github.com/shorifali/)
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 *
 */

'use strict';

$(document).ready(function() {

    // Default option
    var option = '<option value="0" selected="selected">Select Option</option>';

    // Method to clear dropdowns down to a given level
    var clearDropDown = function(arrayObj, startIndex) {
        $.each(arrayObj, function(index, value) {
            if(index >= startIndex) {
                $(value).html(option);
            }
        });
    };

    // Method to disable dropdowns down to a given level
    var disableDropDown = function(arrayObj, startIndex) {
        $.each(arrayObj, function(index, value) {
            if(index >= startIndex) {
                $(value).attr('disabled', 'disabled');
            }
        });
    };

    // Method to disable dropdowns down to a given level
    var enableDropDown = function(that) {
        that.removeAttr('disabled');
    };

    // Method to generate and append options
    var generateOptions = function(element, selection, limit) {
        var options = '';
        for(var i = 1; i <= limit; i++) {
            options += '<option value="' + i + '">Option ' + selection + '-' + i + '</option>';
        }
        element.append(options);
    };

    // Select each of the dropdowns
    var firstDropDown = $('#first');
    var secondDropDown = $('#second');
    var thirdDropDown = $('#third');

    // Hold selected option
    var firstSelection = '';
    var secondSelection = '';
    var thirdSelection = '';

    // Hold selection
    var selection = '';

    // Selection handler for first level dropdown
    firstDropDown.on('change', function() {

        // Get selected option
        firstSelection = firstDropDown.val();

        // Clear all dropdowns down to the hierarchy
        clearDropDown($('select'), 1);

        // Disable all dropdowns down to the hierarchy
        disableDropDown($('select'), 1);

        // Check current selection
        if(firstSelection === '0') {
            return;
        }

        // Enable second level DropDown
        enableDropDown(secondDropDown);

        // Generate and append options
        selection = firstSelection;
        generateOptions(secondDropDown, selection, 4);
    });

    // Selection handler for second level dropdown
    secondDropDown.on('change', function() {
        secondSelection = secondDropDown.val();

        // Clear all dropdowns down to the hierarchy
        clearDropDown($('select'), 2);

        // Disable all dropdowns down to the hierarchy
        disableDropDown($('select'), 2);

        // Check current selection
        if(secondSelection === '0') {
             return;
        }

        // Enable third level DropDown
        enableDropDown(thirdDropDown);

        // Generate and append options
        selection = firstSelection + '-' + secondSelection;
        generateOptions(thirdDropDown, selection, 4);
    });

    // Selection handler for third level dropdown
    thirdDropDown.on('change', function() {
        thirdSelection = thirdDropDown.val();

        console.log(thirdSelection);
        // Final work goes here

     });

    /*
     * In this way we can make any number of dependent dropdowns
     *
     */

});
