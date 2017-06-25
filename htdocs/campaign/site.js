var goal = 7500; // Target value to be raised.


// Helper function: Add commas to longer integers.
// function commaNum(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }
var commaNum = d3.format(",");

// Helper function: Turn form values into an object.
function formValues(form) {
  var record = {};
  ['input', 'textarea'].forEach(function(type) {
    d3.select(form).selectAll(type).each(function() {
      if (this.value.length < 1 ||
        this.name === '') return;
      if (this.type === 'checkbox') {
        record[this.name] = this.checked ? true : false;
      } else if (this.type === 'radio') {
        if (!this.checked) return;
        record[this.name] = this.id;
      } else {
        record[this.name] = this.value;
      }
    });
  });
  return record;
}

var count = 140;
function changeCount() {
  var v = this.value.length;
  var c = d3.select('#count');
  c.text(count - v);
}

function activeTab() {
  var tab = window.location.hash.split('#')[1];
  var slidecontainer = d3.select('.sliding');
  var current = slidecontainer.attr('class').match(/active[0-9]+/);
  if (current) slidecontainer.classed(current[0], false);

  switch (tab) {
    case 'rewards':
      slidecontainer.classed('active2', true);
    break;
    case 'faq':
      slidecontainer.classed('active3', true);
    break;
    default:
      slidecontainer.classed('active1', true);
    break;
  }

  d3.selectAll('.tabs a').classed('active', function() {
    var path = this.href.split('#')[1];
    return (tab) ? path === tab : path === 'about';
  });
}

d3.csv('donors.csv')
  .get(function(err, rows) {
    var el = d3.select('#donor-list')
      .selectAll('tr')
      .data(rows)
      .enter()
      .append('tr')
      .each(function(d) {
        var selection = d3.select(this);
        if (d.premium) {
          selection.append('td')
            .html(d.premium);
        } else {
          selection.append('td')
            .text(d.name);
        }
        selection.append('td')
          .text(d.currency + ' ' + commaNum(d.amount));
        selection.append('td')
          .text(function() {
            return d.message ? d.message : '';
          });
      });

      var raised = rows.reduce(function(memo, row) {
        memo = memo + parseInt(row.amount_usd, 10);
        return memo;
      }, 0); // Value raised so far.

      // d3.select('#js-extra').text('£' + commaNum((raised) ? (raised - 56000): '0'));
      d3.select('#js-progress-bar').style('width', (raised / goal) * 100 + '%');
      d3.select('#js-raised').text('$' + commaNum(raised));
      d3.select('#js-backers').text(rows.length);
  });

d3.select('textarea')
  .on('keydown', changeCount)
  .on('cut', changeCount)
  .on('paste', changeCount);

// Form submission
d3.select('#donate').on('submit', function(e) {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  var array = formValues(this), amount;

  // Validate on messsage length
  if (array.message.length > 140) {
      window.alert('Limit your note to 140 characters.');
  } else {
    if (array.amount === 'amount-custom') {
      amount = array['custom-value'];
    } else {
      amount = array.amount.split('-')[1];
    }

    var vals = {
      amount: amount,
      message: array.message
    };

    // Amount to be submitted to payment vendor.
    // console.log(vals);
  }
});

window.onhashchange = activeTab;
activeTab();

//var bannerImages = ["banner1.jpg","banner2.jpg","banner3.jpg","banner4.jpg","banner5.jpg"];
var bannerImages = ["banner1.jpg","banner2.jpg","banner3.jpg"];
var settingString = 'url(img/' + bannerImages[Math.floor(Math.random() * bannerImages.length)] + ') no-repeat top center';
d3.select('#banner-pic').style('background', settingString);
