import { Resend } from "resend";

type OrderItem = {
  title: string;
  quantity: number;
  unitAmount: number;
  personalisationName?: string;
};

type OrderConfirmation = {
  sessionId: string;
  customerEmail: string;
  customerName?: string;
  orderReference: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency?: string;
  shippingAddress?: string[];
  shippingMethod?: string;
};

function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function money(pence: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(pence / 100);
}

export function buildOrderConfirmationHtml(
  order: OrderConfirmation
): string {
  const currency = order.currency || "GBP";

  const firstName = order.customerName
    ?.trim()
    .split(/\s+/)[0];

  const greeting = firstName
    ? `Hi ${escapeHtml(firstName)},`
    : "Hi lovely,";

  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:20px 0;
                   border-bottom:1px solid #e5ded4;">
          <strong style="font-size:15px;color:#292724;">
            ${escapeHtml(item.title)}
          </strong>

          ${
            item.personalisationName
              ? `
              <div style="font-size:13px;
                          color:#947747;
                          margin-top:7px;">
                Personalised candle box
              </div>
              <div style="font-size:13px;
                          color:#625b52;
                          margin-top:4px;">
                Name: ${escapeHtml(item.personalisationName)}
              </div>`
              : ""
          }

          <div style="font-size:13px;
                      color:#77716a;
                      margin-top:7px;">
            Quantity: ${item.quantity}
          </div>
        </td>

        <td align="right"
            style="padding:20px 0;
                   border-bottom:1px solid #e5ded4;
                   font-size:15px;
                   color:#292724;
                   white-space:nowrap;">
          ${money(item.unitAmount * item.quantity, currency)}
        </td>
      </tr>
    `
    )
    .join("");

  const address = (order.shippingAddress || [])
    .filter(Boolean)
    .map((line) => escapeHtml(line))
    .join("<br>");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <title>Your ASHORA order is confirmed</title>
</head>

<body style="margin:0;
             padding:0;
             background:#f2eee8;
             font-family:Arial,Helvetica,sans-serif;
             color:#292724;">

  <table role="presentation"
         width="100%"
         cellspacing="0"
         cellpadding="0"
         style="background:#f2eee8;">

    <tr>
      <td align="center" style="padding:30px 12px;">

        <table role="presentation"
               width="100%"
               cellspacing="0"
               cellpadding="0"
               style="max-width:600px;
                      background:#ffffff;">

          <!-- Brand header -->
          <tr>
            <td align="center"
                style="padding:38px 24px;
                       background:#292724;">

              <div style="font-size:28px;
                          letter-spacing:9px;
                          color:#d6bb85;">
                ASHORA
              </div>

              <div style="font-size:9px;
                          letter-spacing:2px;
                          color:#e5d9c5;
                          margin-top:12px;">
                THE SEED TO THE GARDEN YOU CAN GROW
              </div>

            </td>
          </tr>

          <!-- Main message -->
          <tr>
            <td style="padding:40px 28px 30px;">

              <div style="font-size:10px;
                          letter-spacing:3px;
                          color:#947747;
                          text-transform:uppercase;">
                Your intention begins here
              </div>

              <h1 style="font-family:Georgia,serif;
                         font-weight:normal;
                         font-size:32px;
                         line-height:1.25;
                         margin:15px 0 24px;">
                A little magic is on its way.
              </h1>

              <p style="font-size:15px;line-height:1.8;">
                ${greeting}
              </p>

              <p style="font-size:15px;line-height:1.8;">
                Thank you for choosing ASHORA.
                Your order has been confirmed, and we
                are so grateful to be part of your
                journey.
              </p>

              <p style="font-size:15px;line-height:1.8;">
                Your candles will be carefully prepared
                and packaged with love and intention.
                We look forward to bringing a little
                magic into your space.
              </p>

            </td>
          </tr>

          <!-- Order reference -->
          <tr>
            <td style="padding:0 28px 25px;">

              <div style="background:#f5f1eb;
                          padding:22px;">

                <div style="font-size:10px;
                            letter-spacing:2px;
                            color:#947747;">
                  ORDER REFERENCE
                </div>

                <div style="font-size:18px;
                            margin-top:9px;">
                  ${escapeHtml(order.orderReference)}
                </div>

                <div style="font-size:12px;
                            color:#625b52;
                            margin-top:8px;">
                  Payment confirmed
                </div>

              </div>

            </td>
          </tr>

          <!-- Order items -->
          <tr>
            <td style="padding:0 28px 30px;">

              <h2 style="font-family:Georgia,serif;
                         font-size:23px;
                         font-weight:normal;">
                Your order
              </h2>

              <table role="presentation"
                     width="100%"
                     cellspacing="0"
                     cellpadding="0">
                ${itemRows}
              </table>

              <table role="presentation"
                     width="100%"
                     cellspacing="0"
                     cellpadding="0"
                     style="margin-top:22px;
                            font-size:14px;">

                <tr>
                  <td style="padding:7px 0;">
                    Subtotal
                  </td>
                  <td align="right">
                    ${money(order.subtotal, currency)}
                  </td>
                </tr>

                ${
                  order.discount > 0
                    ? `
                    <tr>
                      <td style="padding:7px 0;
                                 color:#58704d;">
                        Discount
                      </td>
                      <td align="right"
                          style="color:#58704d;">
                        -${money(order.discount, currency)}
                      </td>
                    </tr>`
                    : ""
                }

                <tr>
                  <td style="padding:7px 0;">
                    Delivery
                  </td>
                  <td align="right">
                    ${
                      order.shipping === 0
                        ? "Complimentary"
                        : money(order.shipping, currency)
                    }
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 0;
                             border-top:1px solid #e5ded4;
                             font-size:17px;">
                    <strong>Total paid</strong>
                  </td>

                  <td align="right"
                      style="border-top:1px solid #e5ded4;
                             font-size:17px;">
                    <strong>
                      ${money(order.total, currency)}
                    </strong>
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- Delivery information -->
          ${
            address || order.shippingMethod
              ? `
              <tr>
                <td style="padding:0 28px 30px;">

                  <div style="background:#f5f1eb;
                              padding:22px;">

                    <h2 style="font-family:Georgia,serif;
                               font-weight:normal;
                               font-size:21px;
                               margin:0 0 15px;">
                      Delivery details
                    </h2>

                    ${
                      address
                        ? `
                        <p style="font-size:14px;
                                  line-height:1.8;
                                  margin:0;">
                          ${address}
                        </p>`
                        : ""
                    }

                    ${
                      order.shippingMethod
                        ? `
                        <p style="font-size:13px;
                                  line-height:1.6;
                                  margin:15px 0 0;">
                          ${escapeHtml(order.shippingMethod)}
                        </p>`
                        : ""
                    }

                  </div>

                </td>
              </tr>`
              : ""
          }

          <!-- Closing message -->
          <tr>
            <td style="padding:0 28px 38px;">

              <p style="font-size:15px;line-height:1.8;">
                If you have any questions about your
                order, simply reply to this email or
                contact us at
                <a href="mailto:info@ashora.co.uk"
                   style="color:#947747;">
                  info@ashora.co.uk
                </a>.
              </p>

              <p style="font-family:Georgia,serif;
                        font-size:17px;
                        line-height:1.8;
                        margin-top:28px;">
                With love &amp; intention,<br>
                Ashora Team
              </p>

              <table role="presentation"
                     cellspacing="0"
                     cellpadding="0"
                     style="margin-top:28px;">
                <tr>
                  <td style="background:#292724;">
                    <a href="https://www.ashora.co.uk"
                       style="display:inline-block;
                              padding:16px 28px;
                              color:#ffffff;
                              text-decoration:none;
                              font-size:11px;
                              letter-spacing:2px;">
                      EXPLORE ASHORA
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
                style="background:#292724;
                       padding:30px 20px;
                       color:#d6bb85;">

              <div style="font-size:16px;
                          letter-spacing:5px;">
                ASHORA
              </div>

              <p style="font-size:11px;
                        color:#e5d9c5;
                        line-height:1.8;">
                Hand-poured in Essex.<br>
                Created with love and intention.
              </p>

              <p style="font-size:11px;
                        color:#e5d9c5;">
                This email confirms your purchase
                from ASHORA.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>`;
}

export function buildOrderConfirmationText(
  order: OrderConfirmation
): string {
  const currency = order.currency || "GBP";

  const items = order.items
    .map((item) => {
      const personalisation = item.personalisationName
        ? `\nPersonalised name: ${item.personalisationName}`
        : "";

      return `${item.title} x ${item.quantity}
${money(item.unitAmount * item.quantity, currency)}${personalisation}`;
    })
    .join("\n\n");

  return [
    "ASHORA",
    "",
    "A little magic is on its way.",
    "",
    `Hi ${order.customerName?.trim().split(/\s+/)[0] || "lovely"},`,
    "",
    "Thank you for choosing ASHORA. Your order is confirmed.",
    "",
    `Order reference: ${order.orderReference}`,
    "",
    items,
    "",
    `Subtotal: ${money(order.subtotal, currency)}`,
    `Discount: ${money(order.discount, currency)}`,
    `Delivery: ${money(order.shipping, currency)}`,
    `Total paid: ${money(order.total, currency)}`,
    "",
    ...(order.shippingAddress || []),
    order.shippingMethod || "",
    "",
    "With love & intention,",
    "Ashora Team",
    "",
    "info@ashora.co.uk",
    "https://www.ashora.co.uk",
  ].join("\n");
}

export async function sendOrderConfirmation(
  order: OrderConfirmation
) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!order.customerEmail || !order.sessionId) {
    throw new Error("Missing order confirmation details");
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send(
    {
      from: "ASHORA <info@ashora.co.uk>",
      to: [order.customerEmail],
      replyTo: "info@ashora.co.uk",
      subject: "Your ASHORA order is confirmed",
      html: buildOrderConfirmationHtml(order),
      text: buildOrderConfirmationText(order),
    },
    {
      idempotencyKey: `ashora-order-${order.sessionId}`,
    }
  );

  if (error) {
    throw new Error(
      `Order confirmation failed: ${error.message}`
    );
  }

  return data;
}