// Pricing Data
const PRICING_DATA = {
    venue: {
        'Peak|Mon–Wed': 3500,
        'Peak|Thu': 4500,
        'Peak|Fri': 8000,
        'Peak|Sat/Holiday': 9000,
        'Peak|Sun': 6000,
        'Mid|Mon–Wed': 3500,
        'Mid|Thu': 4500,
        'Mid|Fri': 6500,
        'Mid|Sat/Holiday': 7500,
        'Mid|Sun': 5500,
        'Off-Peak|Mon–Wed': 3000,
        'Off-Peak|Thu': 4000,
        'Off-Peak|Fri': 5500,
        'Off-Peak|Sat/Holiday': 6500,
        'Off-Peak|Sun': 4500
    },
    barPackages: {
        'Premium Full Bar': 16,
        'Signature Bar': 11,
        'Classic Bar': 9,
        'Beer & Wine': 7,
        'Non-Alcoholic': 6
    },
    barMinimums: {
        'Mon-Wed': 2000,
        'Thu-Fri-Sun': 3000,
        'Sat-Holiday': 4500
    },
    catering: {
        50: { 'Standard Buffet': 3694.84, 'Hill Country Buffet': 5026.32, 'Family Style': 5991.64, 'Plated': 7323.11 },
        75: { 'Standard Buffet': 4527.02, 'Hill Country Buffet': 6524.23, 'Family Style': 7655.98, 'Plated': 8987.46 },
        100: { 'Standard Buffet': 5359.19, 'Hill Country Buffet': 8022.14, 'Family Style': 9986.06, 'Plated': 11317.54 },
        125: { 'Standard Buffet': 6590.8, 'Hill Country Buffet': 9852.92, 'Family Style': 11716.98, 'Plated': 13048.46 },
        150: { 'Standard Buffet': 7356.4, 'Hill Country Buffet': 11350.82, 'Family Style': 13980.49, 'Plated': 15311.96 },
        175: { 'Standard Buffet': 8521.44, 'Hill Country Buffet': 13181.6, 'Family Style': 15644.83, 'Plated': 17642.04 },
        200: { 'Standard Buffet': 9686.48, 'Hill Country Buffet': 15012.38, 'Family Style': 17974.91, 'Plated': 19972.13 }
    },
    rentals: {
        50: 1880.04,   // Same as 75 guests (per user request)
        75: 1880.04,
        100: 2119.82,
        125: 2359.62,
        150: 2599.40,
        175: 2839.19,
        200: 3078.99
    },
    dj: {
        'Premier Entertainment - Prospect House Package': 1600,
        'Byrne Rock - Ceremony & Reception Package': 1575
    },
    centerpieces: {
        'Trio of Candles w/ Greenery': 95,
        'Six Bud Vases (Seasonal Florals)': 100,
        'Petite Compotes': 125,
        'Low & Lush Arrangement': 185,
        'None': 0
    },
    youthFee: 7,
    planning: 3500,
    cleaningFee: 300,
    groundsManagerRate: 45,
    taxRate: 0.0825
};

// Utility function to format currency
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Get season based on month (from Excel logic)
// Peak: March(3), April(4), May(5), October(10), November(11), December(12)
// Mid: June(6), September(9)
// Off-Peak: January(1), February(2), July(7), August(8)
function getSeason(date) {
    if (!date) return '';
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed

    if ([3, 4, 5, 10, 11, 12].includes(month)) {
        return 'Peak';
    } else if ([6, 9].includes(month)) {
        return 'Mid';
    } else {
        return 'Off-Peak';
    }
}

// Get day type based on day of week (from Excel logic)
// Mon, Tue, Wed -> Mon–Wed
// Thu -> Thu
// Fri -> Fri
// Sat -> Sat/Holiday
// Sun -> Sun
function getDayType(date) {
    if (!date) return '';
    const day = date.getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat

    if (day === 1 || day === 2 || day === 3) { // Mon, Tue, Wed
        return 'Mon–Wed';
    } else if (day === 4) { // Thu
        return 'Thu';
    } else if (day === 5) { // Fri
        return 'Fri';
    } else if (day === 6) { // Sat
        return 'Sat/Holiday';
    } else if (day === 0) { // Sun
        return 'Sun';
    }
    return '';
}

// Calculate everything
function calculate() {
    const eventDateInput = document.getElementById('eventDate').value;
    const eventDate = eventDateInput ? new Date(eventDateInput) : null;

    // Auto-populate Season and Day Type based on date
    const season = getSeason(eventDate);
    const dayType = getDayType(eventDate);

    document.getElementById('season').value = season;
    document.getElementById('dayType').value = dayType;

    const guestCount = parseInt(document.getElementById('guestCount').value) || 0;
    const barHours = parseFloat(document.getElementById('barHours').value) || 0;
    const adults21 = parseInt(document.getElementById('adults21').value) || guestCount;
    const youth620 = parseInt(document.getElementById('youth620').value) || 0;
    const kids5 = parseInt(document.getElementById('kids5').value) || 0;
    const barPackage = document.getElementById('barPackage').value;
    const cateringStyle = document.getElementById('cateringStyle').value;
    const djOption = document.getElementById('djOption').value;
    const centerpieceStyle = document.getElementById('centerpieceStyle').value;
    const centerpieceQty = parseInt(document.getElementById('centerpieceQty').value) || 0;

    // Calculate total guest count for bar
    const totalGuestBar = adults21 + youth620 + kids5;
    document.getElementById('totalGuestBar').textContent = totalGuestBar;

    // Validate guest count
    const validationEl = document.getElementById('guestValidation');
    if (totalGuestBar === guestCount || guestCount === 0) {
        validationEl.textContent = 'OK';
        validationEl.className = 'validation-check validation-ok';
    } else {
        validationEl.textContent = 'CHECK - Total does not match';
        validationEl.className = 'validation-check validation-error';
    }

    // Calculate Venue Rental
    const venueKey = `${season}|${dayType}`;
    const venueRental = PRICING_DATA.venue[venueKey] || 0;
    document.getElementById('venueRental').textContent = formatCurrency(venueRental);

    // Planning is fixed
    document.getElementById('planning').textContent = formatCurrency(PRICING_DATA.planning);

    // Calculate Bar Rate
    const barRate = PRICING_DATA.barPackages[barPackage] || 0;
    document.getElementById('barRate').textContent = formatCurrency(barRate);

    // Calculate Bar Subtotal (with discount for off-peak, but not Sat/Holiday)
    let barDiscount = 1.0;
    if (season === 'Off-Peak' && dayType !== 'Sat/Holiday') {
        barDiscount = 0.9; // 10% off
    }
    const barSubtotal = adults21 * barHours * barRate * barDiscount;
    document.getElementById('barSubtotal').textContent = formatCurrency(barSubtotal);

    // Calculate Youth Fee
    const youthFee = youth620 * PRICING_DATA.youthFee;
    document.getElementById('youthFee').textContent = formatCurrency(youthFee);

    // Bar Before Minimum
    const barBeforeMin = barSubtotal + youthFee;
    document.getElementById('barBeforeMin').textContent = formatCurrency(barBeforeMin);

    // Calculate Bar Minimum based on day of week
    // Excel WEEKDAY mode 2: Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=7
    let barMinimum = 0;
    if (eventDate) {
        let dayOfWeek = eventDate.getDay(); // JavaScript: 0=Sun, 1=Mon, ... 6=Sat

        // Convert to Excel WEEKDAY mode 2: Mon=1, Tue=2, ..., Sun=7
        let excelWeekday = dayOfWeek === 0 ? 7 : dayOfWeek;

        // Formula: IF(OR(WEEKDAY=1,2,3), 2000, IF(OR(WEEKDAY=4,5,7), 3000, 4500))
        if (excelWeekday >= 1 && excelWeekday <= 3) { // Mon-Wed
            barMinimum = PRICING_DATA.barMinimums['Mon-Wed'];
        } else if (excelWeekday === 4 || excelWeekday === 5 || excelWeekday === 7) { // Thu, Fri, Sun
            barMinimum = PRICING_DATA.barMinimums['Thu-Fri-Sun'];
        } else { // Sat (6) or Holiday
            barMinimum = PRICING_DATA.barMinimums['Sat-Holiday'];
        }
    }
    document.getElementById('barMinimum').textContent = formatCurrency(barMinimum);

    // Bar Subtotal After Minimum (max of before minimum or minimum)
    const barSubtotalAfterMin = Math.max(barBeforeMin, barMinimum);
    document.getElementById('barSubtotalAfterMin').textContent = formatCurrency(barSubtotalAfterMin);

    // Bar Tax (8.25%)
    const barTax = barSubtotalAfterMin * PRICING_DATA.taxRate;
    document.getElementById('barTax').textContent = formatCurrency(barTax);

    // Bar Total (with tax)
    const barTotal = barSubtotalAfterMin + barTax;
    document.getElementById('barTotal').textContent = formatCurrency(barTotal);

    // Calculate Catering Total
    const cateringTotal = PRICING_DATA.catering[guestCount]?.[cateringStyle] || 0;
    document.getElementById('cateringTotal').textContent = formatCurrency(cateringTotal);

    // Calculate Rentals Total (using VLOOKUP logic - find closest match)
    // Now includes 50 guests at same price as 75
    let rentalsTotal = 0;
    if (guestCount > 0) {
        const rentalKeys = Object.keys(PRICING_DATA.rentals).map(Number).sort((a, b) => a - b);
        for (let i = rentalKeys.length - 1; i >= 0; i--) {
            if (guestCount >= rentalKeys[i]) {
                rentalsTotal = PRICING_DATA.rentals[rentalKeys[i]];
                break;
            }
        }
    }
    document.getElementById('rentalsTotal').textContent = formatCurrency(rentalsTotal);

    // Calculate Floral Tier
    let floralTier = '';
    let floralBase = 0;
    if (guestCount >= 100) {
        floralTier = 'Tier 3';
        floralBase = 6000;
    } else if (guestCount >= 75) {
        floralTier = 'Tier 2';
        floralBase = 5500;
    } else if (guestCount >= 50) {
        floralTier = 'Tier 1';
        floralBase = 4500;
    } else if (guestCount > 0) {
        floralTier = 'Below Minimum';
        floralBase = 0;
    }
    document.getElementById('floralTier').textContent = floralTier || '-';
    document.getElementById('floralBase').textContent = formatCurrency(floralBase);

    // Calculate Centerpiece Add-Ons
    const centerpiecePrice = PRICING_DATA.centerpieces[centerpieceStyle] || 0;
    const floralAddOns = centerpiecePrice * centerpieceQty;
    document.getElementById('floralAddOns').textContent = formatCurrency(floralAddOns);

    // Floral Subtotal
    const floralSubtotal = floralBase + floralAddOns;
    document.getElementById('floralSubtotal').textContent = formatCurrency(floralSubtotal);

    // Floral Tax (8.25%)
    const floralTax = floralSubtotal * PRICING_DATA.taxRate;
    document.getElementById('floralTax').textContent = formatCurrency(floralTax);

    // Floral Total (with tax)
    const floralTotal = floralSubtotal + floralTax;
    document.getElementById('floralTotal').textContent = formatCurrency(floralTotal);

    // Calculate DJ Total
    const djTotal = PRICING_DATA.dj[djOption] || 0;
    document.getElementById('djTotal').textContent = formatCurrency(djTotal);

    // Calculate Grounds Manager Fee = (Bar Hours + 2) x $45
    const groundsManagerFee = (barHours + 2) * PRICING_DATA.groundsManagerRate;
    document.getElementById('groundsManager').textContent = formatCurrency(groundsManagerFee);

    // Cleaning Fee is fixed
    document.getElementById('cleaningFee').textContent = formatCurrency(PRICING_DATA.cleaningFee);

    // Calculate Estimated Total (including all new fields)
    const estimatedTotal = venueRental + PRICING_DATA.planning + barTotal + cateringTotal + rentalsTotal + floralTotal + djTotal + groundsManagerFee + PRICING_DATA.cleaningFee;
    document.getElementById('estimatedTotal').textContent = formatCurrency(estimatedTotal);
}

// Submit form
function submitForm() {
    // Validate required fields
    const requiredFields = ['eventDate', 'guestCount', 'barHours', 'barPackage', 'cateringStyle', 'djOption'];
    let isValid = true;

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    }

    if (!isValid) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }

    // Get validation status
    const validationEl = document.getElementById('guestValidation');
    const validationStatus = validationEl.textContent;

    // Collect form data including all calculated values
    const formData = {
        // Input fields
        season: document.getElementById('season').value,
        eventDate: document.getElementById('eventDate').value,
        dayType: document.getElementById('dayType').value,
        guestCount: document.getElementById('guestCount').value,
        barHours: document.getElementById('barHours').value,
        adults21: document.getElementById('adults21').value || document.getElementById('guestCount').value,
        youth620: document.getElementById('youth620').value || '0',
        kids5: document.getElementById('kids5').value || '0',
        barPackage: document.getElementById('barPackage').value,
        cateringStyle: document.getElementById('cateringStyle').value,
        djOption: document.getElementById('djOption').value,
        centerpieceStyle: document.getElementById('centerpieceStyle').value || 'None',
        centerpieceQty: document.getElementById('centerpieceQty').value || '0',
        remarks: document.getElementById('remarks').value,

        // Calculated values
        totalGuestBar: document.getElementById('totalGuestBar').textContent,
        validationStatus: validationStatus,
        venueRental: document.getElementById('venueRental').textContent,
        planning: document.getElementById('planning').textContent,
        barRate: document.getElementById('barRate').textContent,
        barSubtotal: document.getElementById('barSubtotal').textContent,
        youthFee: document.getElementById('youthFee').textContent,
        barBeforeMin: document.getElementById('barBeforeMin').textContent,
        barMinimum: document.getElementById('barMinimum').textContent,
        barSubtotalAfterMin: document.getElementById('barSubtotalAfterMin').textContent,
        barTax: document.getElementById('barTax').textContent,
        barTotal: document.getElementById('barTotal').textContent,
        cateringTotal: document.getElementById('cateringTotal').textContent,
        rentalsTotal: document.getElementById('rentalsTotal').textContent,
        floralTier: document.getElementById('floralTier').textContent,
        floralBase: document.getElementById('floralBase').textContent,
        floralAddOns: document.getElementById('floralAddOns').textContent,
        floralSubtotal: document.getElementById('floralSubtotal').textContent,
        floralTax: document.getElementById('floralTax').textContent,
        floralTotal: document.getElementById('floralTotal').textContent,
        djTotal: document.getElementById('djTotal').textContent,
        groundsManager: document.getElementById('groundsManager').textContent,
        cleaningFee: document.getElementById('cleaningFee').textContent,
        estimatedTotal: document.getElementById('estimatedTotal').textContent
    };

    // Disable submit button and show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.6';

    // Send data to PHP backend
    fetch('send-estimate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';

            if (data.success) {
                alert('✓ ' + data.message);
                // Optionally reset form or redirect
                // window.location.reload();
            } else {
                alert('✗ ' + data.message);
            }
        })
        .catch(error => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';

            console.error('Error:', error);
            alert('✗ An error occurred while sending the estimate. Please try again.\n\nError details: ' + error.message);
        });
}

// Add event listeners to all inputs
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('change', calculate);
    input.addEventListener('input', calculate);
});

// Initial calculation
calculate();