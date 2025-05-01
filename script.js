// Espera o carregamento completo da página
window.onload = () => {
  const form = document.getElementById("cv-form");

  // Ao enviar o formulário, gerar o PDF
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recarregamento da página
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Captura os dados preenchidos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const experiencia = document.getElementById("experiencia").value;
    const formacao = document.getElementById("formacao").value;
    const fotoInput = document.getElementById("foto");

    // Título do currículo
    doc.setFontSize(18);
    doc.text("Currículo Profissional", 20, 20);

    // Informações principais
    doc.setFontSize(12);
    doc.text(`Nome: ${nome}`, 20, 35);
    doc.text(`Email: ${email}`, 20, 45);
    doc.text(`Telefone: ${telefone}`, 20, 55);

    // Se houver imagem, lê e adiciona
    if (fotoInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imgData = event.target.result;
        doc.addImage(imgData, "JPEG", 140, 20, 50, 50); // Posição e tamanho da imagem

        const yStart = 80;

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text("Experiência Profissional:", 20, yStart);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(doc.splitTextToSize(experiencia, 170), 20, yStart + 10);

        const yFormacao = yStart + 10 + doc.splitTextToSize(experiencia, 170).length * 10;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text("Formação Acadêmica:", 20, yFormacao);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(doc.splitTextToSize(formacao, 170), 20, yFormacao + 10);

        // Salva o PDF
        doc.save("curriculo_profissional_com_foto.pdf");
      };
      reader.readAsDataURL(fotoInput.files[0]);
    } else {
      const yStart = 70;

      doc.setFontSize(14);
      doc.setTextColor(0, 0, 255);
      doc.text("Experiência Profissional:", 20, yStart);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(doc.splitTextToSize(experiencia, 170), 20, yStart + 10);

      const yFormacao = yStart + 10 + doc.splitTextToSize(experiencia, 170).length * 10;
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 255);
      doc.text("Formação Acadêmica:", 20, yFormacao);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(doc.splitTextToSize(formacao, 170), 20, yFormacao + 10);

      doc.save("curriculo_profissional.pdf");
    }
  });
};
