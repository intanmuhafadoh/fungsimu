// DATA SOAL LATIHAN
const questions = [
    {
        question: "Diketahui f(x) = 2x + 3. Berapakah nilai f(4)?",
        options: ["9", "10", "11", "12"],
        answer: 2,
        explanation: "f(4) = 2(4) + 3 = 8 + 3 = 11. Jadi, nilai f(4) adalah 11."
    },
    {
        question: "Dina membeli buku seharga Rp4.000 per buah dan membayar biaya bungkus tetap Rp2.000. Jika x menyatakan jumlah buku, model fungsi yang tepat adalah ...",
        options: [
            "f(x) = 4.000x",
            "f(x) = 4.000x + 2.000",
            "f(x) = 2.000x + 4.000",
            "f(x) = 6.000x"
        ],
        answer: 1,
        explanation: "Harga buku bergantung pada jumlah buku, yaitu 4.000x. Biaya bungkus selalu Rp2.000. Jadi, f(x) = 4.000x + 2.000."
    },
    {
        question: "Jika f(x) = 3x + 2, berapakah nilai f(2)?",
        options: ["6", "8", "7", "9"],
        answer: 1,
        explanation: "Angka 2 menggantikan x. Maka f(2) = 3(2) + 2 = 6 + 2 = 8."
    },
    {
        question: "Biaya perjalanan ojek dinyatakan dengan f(x) = 3.000x + 2.000. Jika Andi menempuh jarak 4 km, berapakah biaya yang harus dibayar?",
        options: [
            "Rp12.000",
            "Rp13.000",
            "Rp14.000",
            "Rp15.000"
        ],
        answer: 2,
        explanation: "f(4) = 3.000(4) + 2.000 = 12.000 + 2.000 = Rp14.000. Biaya awal Rp2.000 juga harus dihitung."
    },
    {
        question: "Diketahui f(x) = 5x - 2. Rina menghitung f(3) = 5 + 3 - 2 = 6. Apakah jawaban Rina benar?",
        options: [
            "Benar, karena 3 ditambahkan ke 5",
            "Salah, seharusnya f(3) = 5(3) - 2 = 13",
            "Benar, karena hasilnya 6",
            "Salah, seharusnya f(3) = 5(2) - 3 = 7"
        ],
        answer: 1,
        explanation: "Jawaban Rina salah karena 3 harus menggantikan x, sehingga 5 dikalikan 3, bukan ditambah 3. Hasilnya f(3) = 15 - 2 = 13."
    }
];
// DATA SOAL LATIHAN
// (Lima soal yang sudah kamu buat)

// PETUNJUK UNTUK SETIAP SOAL
const hints = [
    "Perhatikan bentuk f(x) = 2x + 3. Angka 4 harus menggantikan x. Setelah itu, lakukan perkalian terlebih dahulu.",
    "Pisahkan biaya berdasarkan jenisnya. Harga buku bergantung pada jumlah buku, sedangkan biaya bungkus tetap.",
    "Angka di dalam f(2) adalah nilai pengganti x. Masukkan angka 2 ke dalam fungsi.",
    "Perhatikan dua bagian biaya: biaya berdasarkan jarak dan biaya awal. Keduanya harus dijumlahkan.",
    "Perhatikan tanda operasi pada fungsi f(x) = 5x - 2. Apakah angka 3 harus dikalikan dengan 5 atau ditambahkan?"
];

// VARIABEL LATIHAN
let currentQuestion = 0;
let score = 0;
let answered = false;
let questionOrder = [];

// MENGACAK URUTAN SOAL
function shuffleQuestions() {
    let order = questions.map((_, index) => index);

    for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [order[i], order[j]] = [order[j], order[i]];
    }

    return order;
}

// MENAMPILKAN SOAL
function showQuestion() {
    answered = false;
    document.getElementById("hint-text").textContent = "";
document.getElementById("hint-button").disabled = false;

    const question = questions[questionOrder[currentQuestion]];

    document.getElementById("question-number").textContent =
        "Soal " + (currentQuestion + 1) + " dari " + questions.length;

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("feedback").textContent = "";
    document.getElementById("explanation").textContent = "";

    document.getElementById("next-button").disabled = true;

    document.getElementById("progress-bar").style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    const optionsContainer = document.getElementById("options");

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option, index) {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", function() {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

// MEMERIKSA JAWABAN
function checkAnswer(selectedAnswer) {
    if (answered) {
        return;
    }

    answered = true;
document.getElementById("hint-button").disabled = true;

    const question = questions[questionOrder[currentQuestion]];
    const feedback = document.getElementById("feedback");
    const explanation = document.getElementById("explanation");
    const buttons = document.querySelectorAll("#options button");

    if (selectedAnswer === question.answer) {
        score += 20;

        feedback.textContent = "Hebat! Jawaban kamu benar! 🎉";
        feedback.style.color = "#247346";
    } else {
        feedback.textContent = "Jawaban kamu belum tepat. Perhatikan pembahasan berikut, ya!";
        feedback.style.color = "#d34b4b";
    }

    explanation.innerHTML =
        "<strong>Pembahasan:</strong><br>" +
        question.explanation;

    buttons.forEach(function(button, index) {
        button.disabled = true;

        if (index === question.answer) {
            button.style.background = "#e8f7ee";
            button.style.border = "2px solid #247346";
            button.style.color = "#247346";
        }

        if (index === selectedAnswer && selectedAnswer !== question.answer) {
            button.style.background = "#fdeaea";
            button.style.border = "2px solid #d34b4b";
            button.style.color = "#d34b4b";
        }
    });

    document.getElementById("next-button").disabled = false;

    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-button").textContent = "Lihat Hasil";
    }
}
// PINDAH KE SOAL BERIKUTNYA
function nextQuestion() {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// MENAMPILKAN HASIL AKHIR
function showResult() {
    // Menyembunyikan bagian latihan
    document.getElementById("question-number").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("hint-button").style.display = "none";
    document.getElementById("hint-text").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("explanation").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    // Menampilkan hasil akhir
    document.getElementById("result").style.display = "block";

    // Menghitung jawaban benar dan salah
    const correctCount = score / 20;
    const wrongCount = questions.length - correctCount;

    document.getElementById("final-score").textContent =
        "Nilai Akhir: " + score + " / 100";

    let message = "";

    if (score === 100) {
        message = "Luar biasa! Semua jawaban kamu benar! 🎉";
    } else if (score >= 80) {
        message = "Hebat! Pemahamanmu sudah sangat baik!";
    } else if (score >= 60) {
        message = "Bagus! Terus tingkatkan pemahamanmu, ya!";
    } else {
        message = "Jangan menyerah! Pelajari kembali materi nilai fungsi dan coba lagi, ya!";
    }

    document.getElementById("final-message").innerHTML =
        "<strong>" + message + "</strong><br><br>" +
        "Jawaban benar: " + correctCount + " soal<br>" +
        "Jawaban salah: " + wrongCount + " soal<br>" +
        "Total soal: " + questions.length + " soal";
}
// MENGULANG LATIHAN
// MENAMPILKAN PETUNJUK
function showHint() {
    const hintText = document.getElementById("hint-text");

    hintText.textContent =
    "Petunjuk: " + hints[questionOrder[currentQuestion]];

    document.getElementById("hint-button").disabled = true;
}

// MENJALANKAN LATIHAN SAAT HALAMAN DIBUKA
questionOrder = shuffleQuestions();
showQuestion();
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    questionOrder = shuffleQuestions();

    document.getElementById("question-number").style.display = "block";
    document.querySelector(".progress-container").style.display = "block";
    document.getElementById("question").style.display = "block";
    document.getElementById("options").style.display = "grid";
    document.getElementById("hint-button").style.display = "inline-block";
    document.getElementById("hint-text").style.display = "block";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("explanation").style.display = "block";
    document.getElementById("next-button").style.display = "inline-block";

    document.getElementById("next-button").textContent = "Soal Berikutnya";
    document.getElementById("next-button").disabled = true;

    document.getElementById("hint-button").disabled = false;
    document.getElementById("hint-text").textContent = "";

    document.getElementById("result").style.display = "none";

    showQuestion();
}
// =========================
// CHATBOT FUNGSI MU AI
// =========================

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chatLoading = document.getElementById("chat-loading");
const chatSend = document.getElementById("chat-send");

// Menyimpan riwayat percakapan
let chatHistory = [];
    // Mengubah Markdown AI menjadi tampilan HTML
  function formatAIMessage(message) {
    let text = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\r\n/g, "\n")
        .trim();

    // Format rumus matematika
    text = text.replace(
        /\\\((.*?)\\\)/g,
        '<span class="chat-math">$1</span>'
    );

    text = text.replace(
        /\\\[([\s\S]*?)\\\]/g,
        '<span class="chat-math">$1</span>'
    );

    const lines = text.split("\n");
    const output = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Mendeteksi tabel Markdown
        if (
            line.includes("|") &&
            i + 1 < lines.length &&
            /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[i + 1].trim())
        ) {
            const headers = line
                .replace(/^\||\|$/g, "")
                .split("|")
                .map(cell => cell.trim());

            let tableHTML = "<table><thead><tr>";

            headers.forEach(header => {
                tableHTML += "<th>" + header + "</th>";
            });

            tableHTML += "</tr></thead><tbody>";

            i += 2;

            while (i < lines.length && lines[i].includes("|")) {
                const cells = lines[i]
                    .trim()
                    .replace(/^\||\|$/g, "")
                    .split("|")
                    .map(cell => cell.trim());

                tableHTML += "<tr>";

                cells.forEach(cell => {
                    tableHTML += "<td>" + cell + "</td>";
                });

                tableHTML += "</tr>";
                i++;
            }

            tableHTML += "</tbody></table>";
            output.push(tableHTML);
            i--;
            continue;
        }

        // Garis pemisah
        if (line === "---") {
            output.push("<hr>");
            continue;
        }

        // Judul
        if (line.startsWith("### ")) {
            output.push("<h4>" + line.substring(4) + "</h4>");
            continue;
        }

        if (line.startsWith("## ") || line.startsWith("# ")) {
            output.push("<h3>" + line.replace(/^#+ /, "") + "</h3>");
            continue;
        }

        // Tulisan tebal dan miring
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");

        output.push(line);
    }

    return output.join("<br>");
}
// Menambahkan pesan ke tampilan chatbot
function addChatMessage(message, sender) {
    const messageElement = document.createElement("div");

    messageElement.classList.add(
        "chat-message",
        sender === "user" ? "user-message" : "ai-message"
    );

    if (sender === "ai") {
    messageElement.innerHTML = formatAIMessage(message);
} else {
    messageElement.textContent = message;
}
    chatMessages.appendChild(messageElement);

    // Menggeser tampilan ke pesan terbaru
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mengirim pesan ke backend Groq
if (chatForm) {
    chatForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) {
            return;
        }

        // Menampilkan pesan pengguna
        addChatMessage(message, "user");

        chatInput.value = "";
        chatInput.disabled = true;
        chatSend.disabled = true;

        chatLoading.style.display = "block";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch(
    "https://web-nilai-fungsi-2225250132.vercel.app/api/chat",
    {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: message,
                        history: chatHistory
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Gagal menghubungi asisten AI."
                );
            }

            // Mengambil jawaban dari AI
            const aiReply = data.reply;

            if (!aiReply) {
                throw new Error("AI belum memberikan jawaban.");
            }

            // Menampilkan jawaban AI
            addChatMessage(aiReply, "ai");

            // Menyimpan riwayat percakapan
            chatHistory.push(
                {
                    role: "user",
                    content: message
                },
                {
                    role: "assistant",
                    content: aiReply
                }
            );

        } catch (error) {
            addChatMessage(
                "Maaf, terjadi kendala saat menghubungi FungsiMu AI. Pastikan backend sedang berjalan, lalu coba lagi.",
                "ai"
            );

            console.error("Chatbot error:", error);

        } finally {
            chatLoading.style.display = "none";
            chatInput.disabled = false;
            chatSend.disabled = false;
            chatInput.focus();
        }
    });
}
// ===================================
// SISTEM TANTANGAN BERDASARKAN LEVEL
// ===================================

const levelQuestions = {
    Mudah: [
        {
            question: "Diketahui f(x) = 2x + 3. Berapakah f(2)?",
            options: ["5", "7", "8", "9"],
            answer: 1,
            explanation: "f(2) = 2(2) + 3 = 4 + 3 = 7."
        },
        {
            question: "Diketahui f(x) = 3x + 1. Berapakah f(1)?",
            options: ["3", "4", "5", "6"],
            answer: 1,
            explanation: "f(1) = 3(1) + 1 = 4."
        },
        {
            question: "Jika f(x) = x + 5, berapakah f(3)?",
            options: ["7", "8", "9", "10"],
            answer: 1,
            explanation: "f(3) = 3 + 5 = 8."
        },
        {
            question: "Jika f(x) = 4x, berapakah f(2)?",
            options: ["6", "8", "10", "12"],
            answer: 1,
            explanation: "f(2) = 4 × 2 = 8."
        },
        {
            question: "Diketahui f(x) = 5x - 2. Berapakah f(2)?",
            options: ["6", "7", "8", "9"],
            answer: 2,
            explanation: "f(2) = 5(2) - 2 = 10 - 2 = 8. Jawaban yang benar adalah 8, yaitu pilihan ketiga."
        }
    ],

    Sedang: [
        {
            question: "Jika f(x) = 3x + 4, berapakah f(5)?",
            options: ["15", "17", "19", "20"],
            answer: 2,
            explanation: "f(5) = 3(5) + 4 = 15 + 4 = 19."
        },
        {
            question: "Diketahui f(x) = 2x - 5. Jika f(a) = 9, berapakah nilai a?",
            options: ["5", "6", "7", "8"],
            answer: 2,
            explanation: "2a - 5 = 9, sehingga 2a = 14 dan a = 7."
        },
        {
            question: "Jika f(x) = 4x + 2, berapakah f(-2)?",
            options: ["-10", "-8", "-6", "-4"],
            answer: 2,
            explanation: "f(-2) = 4(-2) + 2 = -8 + 2 = -6."
        },
        {
            question: "Diketahui f(x) = ax + 2 dan f(3) = 14. Berapakah nilai a?",
            options: ["2", "3", "4", "5"],
            answer: 2,
            explanation: "3a + 2 = 14, maka 3a = 12 dan a = 4."
        },
        {
            question: "Jika f(x) = 2x + 1, berapakah nilai x jika f(x) = 13?",
            options: ["5", "6", "7", "8"],
            answer: 1,
            explanation: "2x + 1 = 13, sehingga 2x = 12 dan x = 6."
        }
    ],

    Sulit: [
        {
            question: "Diketahui f(x) = 2x + 3 dan g(x) = x - 1. Berapakah f( g(4) )?",
            options: ["7", "9", "11", "13"],
            answer: 1,
            explanation: "g(4) = 4 - 1 = 3. Kemudian f(3) = 2(3) + 3 = 9."
        },
        {
            question: "Jika f(x) = ax + 5 dan f(2) = 13, berapakah f(4)?",
            options: ["17", "19", "21", "23"],
            answer: 2,
            explanation: "2a + 5 = 13, maka a = 4. Jadi f(4) = 4(4) + 5 = 21."
        },
        {
            question: "Diketahui f(x) = 3x - 2. Jika f(a) = 16, berapakah f(a + 2)?",
            options: ["20", "22", "24", "26"],
            answer: 1,
            explanation: "3a - 2 = 16, maka a = 6. Jadi f(a + 2) = f(8) = 3(8) - 2 = 22. Jawaban yang benar adalah 22, yaitu pilihan kedua."
        },
        {
            question: "Suatu fungsi dinyatakan f(x) = ax + b. Jika f(1) = 5 dan f(3) = 11, berapakah f(5)?",
            options: ["15", "17", "19", "21"],
            answer: 1,
            explanation: "a + b = 5 dan 3a + b = 11. Diperoleh a = 3 dan b = 2. Jadi f(5) = 3(5) + 2 = 17."
        },
        {
            question: "Diketahui f(x) = 2x² - 3x + 1. Berapakah f(-2)?",
            options: ["9", "11", "13", "15"],
            answer: 3,
            explanation: "f(-2) = 2(-2)² - 3(-2) + 1 = 8 + 6 + 1 = 15."
        }
    ]
};

let activeLevel = "";
let levelIndex = 0;
let levelScore = 0;
let levelAnswered = false;
let shuffledLevelQuestions = [];

function shuffleLevelQuestions(questions) {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}
function startLevel(level) {
   activeLevel = level;
levelIndex = 0;
levelScore = 0;

// Acak urutan soal sesuai level yang dipilih
shuffledLevelQuestions = shuffleLevelQuestions(levelQuestions[activeLevel]);

    // Sembunyikan pilihan level setelah dipilih
    document.querySelector(".level-grid").style.display = "none";
    document.getElementById("level-message").style.display = "none";

    // Tampilkan area kuis
    document.getElementById("level-quiz").style.display = "block";
    document.getElementById("level-title").textContent = "Level " + level;

    document.getElementById("level-question-number").style.display = "block";
    document.getElementById("level-question").style.display = "block";
    document.getElementById("level-options").style.display = "grid";
    document.getElementById("level-feedback").style.display = "block";
    document.getElementById("level-explanation").style.display = "block";
    document.getElementById("level-next-button").style.display = "none";
    document.getElementById("level-result").style.display = "none";
    showLevelQuestion();
}
function showLevelQuestion() {
    const question = shuffledLevelQuestions[levelIndex];

    levelAnswered = false;

    document.getElementById("level-question-number").textContent =
        "Soal " + (levelIndex + 1) + " dari 5";

    document.getElementById("level-progress-bar").style.width =
        ((levelIndex + 1) / 5 * 100) + "%";

    document.getElementById("level-question").textContent =
        question.question;

    document.getElementById("level-feedback").textContent = "";
    document.getElementById("level-explanation").textContent = "";
    document.getElementById("level-next-button").style.display = "none";

    const optionsContainer = document.getElementById("level-options");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.textContent = option;
        button.onclick = () => checkLevelAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkLevelAnswer(selectedIndex) {
    if (levelAnswered) return;

    levelAnswered = true;

    const question = shuffledLevelQuestions[levelIndex];
    const buttons = document.querySelectorAll("#level-options button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
    });

    const feedback = document.getElementById("level-feedback");

    if (selectedIndex === question.answer) {
        levelScore += 20;
addXP(20);
feedback.textContent = "🎉 Benar! +20 poin XP";
    } else {
        feedback.textContent = "Belum tepat. Yuk, pelajari pembahasannya!";
    }

    document.getElementById("level-explanation").textContent =
        question.explanation;

    const nextButton = document.getElementById("level-next-button");
    nextButton.textContent =
        levelIndex === 4 ? "Lihat Hasil 🏆" : "Soal Berikutnya →";
    nextButton.style.display = "inline-block";
}

function nextLevelQuestion() {
    if (!levelAnswered) return;

    if (levelIndex < 4) {
        levelIndex++;
        showLevelQuestion();
    } else {
        showLevelResult();
    }
}

function showLevelResult() {
    document.getElementById("level-question-number").style.display = "none";
    document.getElementById("level-progress-bar").style.width = "100%";
    document.getElementById("level-question").style.display = "none";
    document.getElementById("level-options").style.display = "none";
    document.getElementById("level-feedback").style.display = "none";
    document.getElementById("level-explanation").style.display = "none";
    document.getElementById("level-next-button").style.display = "none";

    document.getElementById("level-result").style.display = "block";
    completeCurrentLevel();
    const badge = document.getElementById("earned-badge");

if (activeLevel === "Mudah") {
    badge.textContent = "🌱 Pejuang Fungsi";
} else if (activeLevel === "Sedang") {
    badge.textContent = "⭐ Jago Fungsi";
} else if (activeLevel === "Sulit") {
    badge.textContent = "🏆 Master Fungsi";
}
    document.getElementById("level-final-score").textContent =
        "Skor kamu: " + levelScore + " dari 100";
const celebration = document.getElementById("celebration");

if (levelScore === 100) {
    celebration.style.display = "block";
} else {
    celebration.style.display = "none";
}
    let message = "";

    if (levelScore === 100) {
        message = "Luar biasa! Semua jawaban benar! 🌟";
    } else if (levelScore >= 60) {
        message = "Bagus! Terus tingkatkan kemampuanmu! 💪";
    } else {
        message = "Jangan menyerah! Pelajari kembali materinya, ya! 📚";
    }

    document.getElementById("level-final-message").textContent = message;
}

function restartLevel() {
    levelIndex = 0;
    levelScore = 0;

    // Acak ulang soal saat mencoba kembali
    shuffledLevelQuestions = shuffleLevelQuestions(levelQuestions[activeLevel]);

    document.getElementById("level-question-number").style.display = "block";
    document.getElementById("level-question").style.display = "block";
    document.getElementById("level-options").style.display = "grid";
    document.getElementById("level-feedback").style.display = "block";
    document.getElementById("level-explanation").style.display = "block";

    document.getElementById("level-result").style.display = "none";
    showLevelQuestion();
}
function backToLevels() {
    // Sembunyikan area kuis
    document.getElementById("level-quiz").style.display = "none";

    // Tampilkan kembali pilihan level
    document.querySelector(".level-grid").style.display = "grid";
    document.getElementById("level-message").style.display = "block";

    // Reset tampilan hasil kuis
    document.getElementById("level-result").style.display = "none";
}
// ===================================
// SISTEM XP DAN BADGE FUNGSI MU
// ===================================

let totalXP = Number(localStorage.getItem("fungsiMuXP")) || 0;

function updateXPDisplay() {
    const xpDisplay = document.getElementById("total-xp");
    const badgeDisplay = document.querySelector(".xp-badge");

    if (xpDisplay) {
        xpDisplay.textContent = totalXP;
    }

    if (badgeDisplay) {
        if (totalXP >= 300) {
            badgeDisplay.textContent = "🏆 Master";
        } else if (totalXP >= 100) {
            badgeDisplay.textContent = "🥇 Hebat";
        } else {
            badgeDisplay.textContent = "🏅 Pemula";
        }
    }
}

function addXP(amount) {
    totalXP += amount;
    localStorage.setItem("fungsiMuXP", totalXP);
    updateXPDisplay();
}

// Tampilkan XP saat website dibuka
updateXPDisplay();
// ===================================
// SISTEM PROGRESS PERJALANAN BELAJAR
// ===================================

let completedLevels = JSON.parse(
    localStorage.getItem("fungsiMuCompletedLevels") || "[]"
);

function updateJourneyProgress() {
    const total = completedLevels.length;
    const percentage = (total / 3) * 100;

    const journeyText = document.getElementById("journey-text");
    const journeyBar = document.getElementById("journey-progress");

    if (journeyText) {
        journeyText.textContent = total + " dari 3 tantangan selesai";
    }

    if (journeyBar) {
        journeyBar.style.width = percentage + "%";
    }
}

function completeCurrentLevel() {
    if (!completedLevels.includes(activeLevel)) {
        completedLevels.push(activeLevel);

        localStorage.setItem(
            "fungsiMuCompletedLevels",
            JSON.stringify(completedLevels)
        );
    }

    updateJourneyProgress();
}

// Tampilkan progress saat website dibuka
updateJourneyProgress();
// NAVIGASI ANTAR HALAMAN
function showPage(pageId) {

    // Sembunyikan semua halaman
    document.querySelectorAll(".game-screen").forEach(page => {
        page.style.display = "none";
    });

    // Tampilkan halaman yang dipilih
    document.getElementById(pageId).style.display = "block";

    // Mulai dari bagian paling atas setiap membuka halaman
window.scrollTo({
    top: 0,
    behavior: "instant"
});

    // Jika masuk ke menu Soal, reset kuis sebelumnya
    if (pageId === "soal") {
        activeLevel = "";
        levelIndex = 0;
        levelScore = 0;
        levelAnswered = false;
        shuffledLevelQuestions = [];

        document.querySelector(".level-grid").style.display = "grid";
        document.getElementById("level-message").style.display = "block";
        document.getElementById("level-quiz").style.display = "none";
        document.getElementById("level-result").style.display = "none";
    }
}

// KEMBALI KE MENU UTAMA
function showMenu() {
    // Sembunyikan halaman pembuka
    document.getElementById("welcome").style.display = "none";

    // Tampilkan menu utama
    showPage("main-menu");
}
// TOMBOL KEMBALI KE ATAS
window.addEventListener("scroll", function () {
    const backToTop = document.getElementById("back-to-top");

    if (window.scrollY > 200) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});