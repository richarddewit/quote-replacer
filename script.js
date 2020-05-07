(function() {
    var quotes = {
        fancy: "“”",
        double: '"',
        single: "'",
        backtick: "`",
        french: "«»",
    };
    var from = "fancy";
    var to = "double";

    var form = document.forms.quoteform;
    var origin = form.origin;
    var result = form.result;

    form.from.forEach(function(radio) {
        if (radio.value === from) {
            radio.checked = true;
        }

        radio.addEventListener("change", function() {
            from = this.value;
            replaceQuotes();
        });
    });

    form.to.forEach(function(radio) {
        if (radio.value === to) {
            radio.checked = true;
        }

        radio.addEventListener("change", function() {
            to = this.value;
            replaceQuotes();
        });
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        replaceQuotes();
    });

    origin.addEventListener("keyup", function(e) {
        replaceQuotes();
    });

    origin.addEventListener("paste", function(e) {
        setTimeout(replaceQuotes, 0);
    });

    function replaceQuotes() {
        var re = new RegExp("[" + quotes[from] + "]", "g");
        result.value = origin.value.replace(re, quotes[to]);
    }

    document.getElementById("copy").addEventListener("click", function(e) {
        e.preventDefault();
        var btn = this;
        var btnText = btn.innerText;
        var width = btn.getBoundingClientRect().width;

        btn.disabled = true;
        btn.style.width = width + "px";
        result.select();
        document.execCommand("copy");
        btn.innerText = "Copied!";

        setTimeout(function() {
            btn.disabled = false;
            btn.innerText = btnText;
            btn.removeAttribute("style");
        }, 1000);
    });
})();
