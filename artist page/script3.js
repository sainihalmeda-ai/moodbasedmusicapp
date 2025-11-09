// ✅ MUSIC DIRECTORS FOR ALL 7 LANGUAGES (IMAGES INCLUDED AS GIVEN)
const directorsData = {
  telugu: [
    { name: "Devi Sri Prasad", img: "https://th.bing.com/th/id/OIP.zNDtlysyQ5X5nOmdixOq_QHaE6?w=229&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Thaman S", img: "https://th.bing.com/th/id/OIP.tkcmYmRvV1ISjiLZzc3NPgHaFj?w=193&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "M.M. Keeravani", img: "https://th.bing.com/th/id/OIP.MjoCnAf4ZTx-LT6_9w1WfQHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "sunitha Upadrashta", img: "https://th.bing.com/th/id/OIP.VTXP8mQO_h5mJUPuS6rUigHaJQ?w=186&h=233&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Sid Sriram", img: "https://th.bing.com/th/id/OIP.c5l0Y8LZRm_77uuDE-TbGQHaE8?w=258&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
  ],
  hindi: [
    { name: "Lata mangeshkar ", img: "https://th.bing.com/th/id/OIP.-D1jNH2Ltba_4p7e1_aHwQHaEo?w=233&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "shreya ghoshal", img: "https://th.bing.com/th/id/OIP.5F0haLSbl2Gahk86kToEpgHaE8?w=292&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "sonu nigam", img: "https://th.bing.com/th/id/OIP.mG40Oy3Xq6Jt_4uQ7Ei5lQHaEK?w=333&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Neha kakkar", img: "https://th.bing.com/th/id/OIP.qs1s8SzKEZMB7rKe_9uPiQHaHa?w=190&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Judin Nautiyal", img: "https://th.bing.com/th/id/OIP.h1Hc-6pZ0xIDVAhfclWPMAHaHa?w=194&h=194&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
  ],
  english: [
    { name: "Taylor Swift", img: "https://th.bing.com/th/id/OIP.p2qjW4-xN1y_OPaU4nzeNQHaLH?w=123&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Adele", img: "https://th.bing.com/th/id/OIP.bD4SMGBzraZ1fTTtXktO9gHaI4?w=152&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "ed sheeran", img: "https://th.bing.com/th/id/OIP.8OqcDUnhxDzbQTUT0E4MaQHaEZ?w=291&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Billie Eilish ", img: "https://th.bing.com/th/id/OIP.xUtoCPapQfpaXHbn54y-tQHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Justin Bieber", img: "https://th.bing.com/th/id/OIP.noKh1KjVXff1laxQ6pLEBwHaKi?w=128&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
  ],
  malayalam: [
    { name: "K J Yesudas", img: "https://th.bing.com/th/id/OIP.IB2sndXXVyUVLxLknklaXQHaE8?w=242&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "K S Chithra", img: "https://th.bing.com/th/id/OIP.GD3pV05twriVQ6Boru26SgHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Sujatha Mohan", img: "https://th.bing.com/th/id/OIP.w1Wtpd2PmXokPxvTENMsSwAAAA?w=134&h=167&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Deepak Dev", img: "https://th.bing.com/th/id/OIP.niv8jpLDPwwH_FefyYFhiAHaEK?w=304&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "M. Jayachandran", img: "https://th.bing.com/th/id/OIP.5LakpCnssOcMOJbxP7-eqgHaFm?w=209&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
  ],
  tamil: [
    { name: "Anirudh Ravichander", img: "https://th.bing.com/th/id/OIP.1VMWhJHvQHVfkJ1fOn1hugHaLH?w=126&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "A.R. Rahman", img: "https://th.bing.com/th/id/OIP.4ZpnU89gOob1S_XNG8LuFwHaE8?w=259&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Yuvan Shankar Raja", img: "https://th.bing.com/th/id/OIP.t-ocMpGAqxviNlltiUCyqQHaJQ?w=186&h=233&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Harris Jayaraj", img: "https://th.bing.com/th/id/OIP.AhwySmBtV3GMwaclUVB5iwHaFj?w=238&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Imman", img: "https://th.bing.com/th/id/OIP.dj_m0Ph8QDamwp5Rk-WgTgHaHa?w=171&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
  ],
  kannada: [
    { name: "Arjun Janya", img: "https://th.bing.com/th/id/OIP.vfQyHg9cdweyWsCc0qywrgAAAA?w=124&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "V. Harikrishna", img: "https://th.bing.com/th/id/OIP.eIt9zhlzC0LvPDQ6NEq8bAAAAA?w=193&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Gurukiran", img: "https://th.bing.com/th/id/OIP.0DQ2b1GFi9rtBjEOyBDuLQHaEK?w=267&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Anup Bhandari", img: "https://th.bing.com/th/id/OIP.UjZineoUMB6QGk3ZgBfzxgAAAA?w=264&h=164&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Raghu Dixit", img: "https://indianexpress.com/wp-content/uploads/2018/02/raghu-dixit-759-2.jpg" }
  ],
  marathi: [
    { name: "Ajay–Atul", img: "https://th.bing.com/th/id/OIP.eLXwKHCbxwcZl9lYCoKSQQHaEO?w=314&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Avadhoot Gupte", img: "https://th.bing.com/th/id/OIP.Dihu8nvAvBelmAmYarpwHAHaFj?w=214&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Aarya Ambekar", img: "https://th.bing.com/th/id/OIP.W9UQaLzBtll_wfPVW_a-HgHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Asha Bhosle", img: "https://th.bing.com/th/id/OIP.EAu3OpiKZM-GzK6o6imVqAHaFj?w=189&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { name: "Hariharan", img: "https://th.bing.com/th/id/OIP._J5Ze_YhJi4rQfcSTz7wwwHaHa?w=200&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
  ]
};

// ✅ Allow MULTIPLE selection + Continue button shows
document.querySelectorAll(".lang-btn").forEach(button => {
  button.addEventListener("click", function () {
    const language = this.getAttribute("data-lang");

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    const directors = directorsData[language];
    const container = document.getElementById("directorsContainer");
    const continueBtn = document.getElementById("continueBtn");

    container.innerHTML = directors
      .map(
        d => `
        <div class="director-card">
          <img src="${d.img}" alt="${d.name}">
          <div class="tick">✔</div>
          <p>${d.name}</p>
        </div>`
      )
      .join("");

    document.querySelectorAll(".director-card").forEach(card => {
      card.addEventListener("click", function () {
        this.classList.toggle("selected");

        const selectedCards = document.querySelectorAll(".director-card.selected");

        continueBtn.style.display = selectedCards.length > 0 ? "block" : "none";
      });
    });
  });
});


// ✅ Navigate to next page
document.getElementById("continueBtn").addEventListener("click", function () {
  window.location.href = "nextpage.html";  // <-- replace with your next page filename
});
