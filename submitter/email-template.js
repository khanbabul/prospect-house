export const generateEmailHTML = (data) => {
    // Build guests string
    let guestsString = `${data.guestCount} Total (${data.adults21} Adults`;
    if (data.youth620 && parseInt(data.youth620) > 0) guestsString += `, ${data.youth620} Youth`;
    if (data.kids5 && parseInt(data.kids5) > 0) guestsString += `, ${data.kids5} Kids`;
    guestsString += ')';

    // Build floral string
    let floralString = data.floralTier || 'None';
    if (data.centerpieceQty && parseInt(data.centerpieceQty) > 0 && data.centerpieceStyle) {
        floralString += ` with ${data.centerpieceQty} ${data.centerpieceStyle}`;
    }

    // Remarks section (conditional)
    const remarksSection = data.remarks && data.remarks.trim() !== '' && data.remarks !== 'None' ? `
        <div style="background-color: #ffffff; border: 2px solid #EDDDD8; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #000000; margin-bottom: 10px; font-family: 'Mulish', sans-serif;">Remarks / Special Requests</div>
            <div style="color: #333333; font-style: italic; font-family: 'Mulish', sans-serif;">${data.remarks}</div>
        </div>
    ` : '';

    return `<!DOCTYPE html>
    <html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Mulish', sans-serif; background-color: #f9f9f9;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #eeeeee;">
                        <tr>
                            <td align="center" style="padding: 40px 0; border-bottom: 1px solid #f0f0f0;">
                                <img src="https://prospecthousetx.vercel.app/assets/img/logo.png" alt="Prospect House" style="height: 65px; width: auto; display: block; padding-bottom: 30px;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 300; text-transform: uppercase; letter-spacing: 4px; color: #000;">PROSPECT HOUSE</h1>
                                <p style="margin: 10px 0 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 2px;">Estimate Request Details</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px;">
                                <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 20px; border-bottom: 1px solid #000; padding-bottom: 5px;">Event Overview</h2>
                                <table width="100%" style="font-size: 14px; color: #444;">
                                    <tr><td style="padding: 8px 0;"><strong>Date:</strong></td><td align="right">${data.eventDate}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Guests:</strong></td><td align="right">${data.guestCount}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Catering Style:</strong></td><td align="right">${data.cateringStyle}</td></tr>
                                </table>

                                <h2 style="font-size: 18px; font-weight: 700; margin-top: 30px; margin-bottom: 20px; border-bottom: 1px solid #000; padding-bottom: 5px;">Financial Summary</h2>
                                <!-- Selections -->
                                <table width="100%" style="font-size: 14px; color: #444;">
                                    <tr><td style="padding: 8px 0;"><strong>Bar:</strong></td><td align="right">${data.barPackage} (${data.barHours} hours)</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Catering:</strong></td><td align="right">${data.cateringStyle}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>DJ:</strong></td><td align="right">${data.djOption}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Floral:</strong></td><td align="right">${floralString}</td></tr>
                                </table>

                                <table width="100%" style="background-color: #fcf8f7; padding: 20px; border-radius: 6px;">
                                    <tr>
                                        <td style="font-size: 16px;"><strong>Estimated Total</strong></td>
                                        <td align="right" style="font-size: 20px; font-weight: 700; color: #000;">${data.estimatedTotal}</td>
                                    </tr>
                                </table>
                                
                                <p style="font-size: 13px; color: #999; margin-top: 20px; font-style: italic;">
                                    <strong>Remarks:</strong> ${data.remarks || "No additional notes provided."}
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 30px; background-color: #EDDDD8; color: #000; font-size: 12px; letter-spacing: 1px;">
                                <p>With 🩷 by <a href="https://devbabul.vercel.app" style="text-decoration: none; color: #000; font-weight: 600;" target="_blank">Babul Khan</a></p>
                                <p><a href="https://prospecthousetx.vercel.app/" style="text-decoration: none; color: #000;">www.prospecthousetx.com</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

};
