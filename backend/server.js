const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

// Tes server
app.get("/", (req, res) => {
    res.send("Backend FungsiMu berhasil berjalan!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Server FungsiMu aktif"
    });
});

// Asisten Belajar RMT
app.post("/api/chat", async (req, res) => {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "API Key Groq belum diatur."
            });
        }

        const { message, history = [] } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "Pesan tidak boleh kosong."
            });
        }

        if (!Array.isArray(history)) {
            return res.status(400).json({
                error: "Format riwayat percakapan tidak valid."
            });
        }

        // Membatasi riwayat agar percakapan tidak terlalu panjang
        const safeHistory = history.slice(-10)
            .filter(item =>
                item &&
                ["user", "assistant"].includes(item.role) &&
                typeof item.content === "string"
            )
            .map(item => ({
                role: item.role,
                content: item.content.slice(0, 2000)
            }));

        const systemPrompt = `
Kamu adalah Asisten Belajar RMT pada website FungsiMu,
media pembelajaran matematika untuk siswa SMP kelas VIII.

MATERI UTAMA:
Nilai Fungsi, khususnya fungsi sederhana seperti
f(x) = 2x + 3 dan penerapannya dalam kehidupan sehari-hari.

LANDASAN RMT:
Bimbing siswa melalui tiga fase:

1. INPUT:
Bantu siswa mengidentifikasi informasi yang diketahui,
hal yang ditanyakan, simbol, dan informasi penting dalam soal.

2. ELABORASI:
Bantu siswa menghubungkan informasi, memahami konsep,
memilih strategi, dan melakukan perhitungan secara bertahap.

3. OUTPUT:
Bantu siswa menyampaikan hasil dengan bahasa matematika
yang tepat serta melakukan refleksi terhadap jawabannya.

MEDIATED LEARNING:
Jangan hanya memberikan jawaban akhir.
Ajukan pertanyaan penuntun, berikan petunjuk bertahap,
dan hubungkan konsep dengan situasi yang mudah dipahami.

COGNITIVE LOAD:
- Intrinsic Load: sesuaikan penjelasan dengan tingkat
  kesulitan konsep dan kemampuan siswa.
- Extraneous Load: gunakan kalimat sederhana,
  terstruktur, dan hindari informasi yang tidak diperlukan.
- Germane Load: bantu siswa menemukan pola,
  menghubungkan konsep, dan menjelaskan alasan jawabannya.

ATURAN:
- Gunakan bahasa Indonesia yang ramah dan mudah dipahami.
- Fokus pada literasi matematika dan nilai fungsi kelas VIII.
- Jika siswa keliru, jangan langsung menyalahkan.
  Tunjukkan bagian yang perlu diperiksa.
- Jika siswa meminta jawaban, bimbing terlebih dahulu
  sebelum memberikan penyelesaian lengkap.
- Jika siswa sudah memahami, berikan apresiasi
  dan pertanyaan refleksi.
- Jangan mengarang informasi dari soal.
- Jangan mengaku bahwa siswa sudah menguasai materi
  jika belum ada bukti dari percakapannya.
`;

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt
                        },
                        ...safeHistory,
                        {
                            role: "user",
                            content: message.trim().slice(0, 2000)
                        }
                    ],
                   max_tokens: 800
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
    console.error("Groq API error:", {
        status: response.status,
        message: data.error?.message || "Tidak ada detail error"
    });

    return res.status(response.status).json({
        error: "Groq gagal memproses pesan.",
        code: response.status,
        detail: data.error?.message || "Tidak ada detail error dari Groq."
    });
}

        const answer = data.choices?.[0]?.message?.content;

        if (!answer) {
            return res.status(502).json({
                error: "AI tidak memberikan jawaban. Silakan coba lagi."
            });
        }

        res.json({
            status: "success",
            reply: answer
        });

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            error: "Terjadi kesalahan pada server FungsiMu."
        });
    }
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server FungsiMu berjalan di http://localhost:${PORT}`);
});