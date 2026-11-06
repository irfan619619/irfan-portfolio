/* Contact form – sends messages to your email using Web3Forms (free).
   1) Go to https://web3forms.com, enter irfanippu95620@gmail.com and get your Access Key.
   2) Paste the key between the quotes below. */
var ACCESS_KEY = "PASTE_YOUR_ACCESS_KEY_HERE";

(function () {
  var f = document.getElementById("cform");
  if (!f) return;
  var st = f.querySelector(".fstatus"), btn = f.querySelector("button");

  function fallback(d) {
    var m = "mailto:irfanippu95620@gmail.com?subject=" + encodeURIComponent(d.subject) +
      "&body=" + encodeURIComponent(d.message + "\n\n– " + d.name + " (" + d.email + ")");
    st.className = "fstatus err";
    st.innerHTML = "Couldn’t send right now. Please <a href=\"" + m + "\">email me directly</a> or use WhatsApp.";
  }

  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (f.elements._honey.value) return;
    var d = {
      name: f.elements.name.value,
      email: f.elements.email.value,
      subject: f.elements.subject.value,
      message: f.elements.message.value
    };
    if (!ACCESS_KEY || ACCESS_KEY.indexOf("PASTE") === 0) { fallback(d); return; }
    btn.disabled = true; btn.textContent = "Sending…"; st.className = "fstatus"; st.textContent = "";
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        from_name: "Portfolio website",
        subject: "Portfolio enquiry: " + d.subject,
        name: d.name, email: d.email, message: d.message
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.success === true || j.success === "true") {
          st.className = "fstatus ok";
          st.textContent = "Thank you! Your message has been sent. I’ll reply soon.";
          f.reset();
        } else { throw new Error(j.message || "fail"); }
      })
      .catch(function () { fallback(d); })
      .finally(function () { btn.disabled = false; btn.textContent = "Send message ↗"; });
  });
})();
