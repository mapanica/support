## Fundraising campaign page

This fundraising page is a PHP/MySQL app originally written by Grant Slater for OSM donation campaigns. It uses Paypal to collect donations and stores results in the database to be extracted by various scripts to update donation amounts.

### Contents
- `database_schema.sql`: The schema of the database. Contains three tables:
  - `currency_rates` used for currency conversions - users can donate in any one of several currencies, but the total is maintained in USD.
  - `donations` is the main ledger for donations. Note the `ENUM` for "target" which needs to be updated for each new campaign.
  - `paypal_callbacks` is something to do with the Paypal processing.
- `htdocs/process/db-connect.inc.php`: Contains database connection details and is included by most of the other PHP scripts.
- `htdocs/process/paypal-*.php`: Deals with submitting a payment to Paypal and handling the callback when the payment has been processed.
- `htdocs/campaign/*`: The donation site. The most interesting (and functional) bit is the "paypalcontribution" form, which submits the donation to be processed by the Paypal scripts. Note the "target" hidden field which allows you to track multiple campaigns.
- `scripts/update_csv_server2015.php`: Script run from cron to update the CSV listing of donors which is loaded by the campaign site to show donation amounts and the total.
- `scripts/update_exch_currency_table.php`: Script run from cron to update the currencies table.
