window.onload = () => {
    const form = document.getElementById("cv-form"); // Pega o formulário do HTML
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Impede o envio padrão do formulário
  
      const { jsPDF } = window.jspdf; // Usa a biblioteca jsPDF
      const doc = new jsPDF(); // Cria um novo PDF
  
      // Coleta as informações inseridas pelo usuário
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const experiencia = document.getElementById("experiencia").value;
      const formacao = document.getElementById("formacao").value;
      const fotoInput = document.getElementById("foto"); // Pega o campo de foto
  
      // Define o título do currículo
      doc.setFontSize(18);
      doc.text("Currículo Profissional", 20, 20); // Adiciona título no PDF
  
      // Adiciona as informações básicas: nome, email, telefone
      doc.setFontSize(12);
      doc.text(`Nome: ${nome}`, 20, 35);
      doc.text(`Email: ${email}`, 20, 45);
      doc.text(`Telefone: ${telefone}`, 20, 55);
  
      // Se o usuário enviar uma foto, adiciona a foto ao PDF
      if (fotoInput.files.length > 0) {
        const reader = new FileReader();
  
        reader.onload = function (event) {
          const imgData = event.target.result; // Converte a imagem para base64
  
          // Adiciona a imagem ao PDF (tamanho e posição ajustados)
          doc.addImage(imgData, "JPEG", 140, 20, 50, 50); // (imagem, tipo, x, y, largura, altura)
  
          // Adiciona a experiência profissional abaixo da foto
          const yStart = 80;
          doc.text("Experiência Profissional:", 20, yStart);
          doc.text(doc.splitTextToSize(experiencia, 170), 20, yStart + 10);
  
          // Calcula o próximo Y para a formação acadêmica
          const yFormacao = yStart + 10 + doc.splitTextToSize(experiencia, 170).length * 10;
          doc.text("Formação Acadêmica:", 20, yFormacao);
          doc.text(doc.splitTextToSize(formacao, 170), 20, yFormacao + 10);
  
          // Salva o PDF com nome específico
          doc.save("curriculo_profissional_com_foto.pdf");
        };
  
        // Lê o arquivo de imagem
        reader.readAsDataURL(fotoInput.files[0]);
  
      } else {
        // Se não houver foto, cria o currículo sem ela
        const yStart = 70;
        doc.text("Experiência Profissional:", 20, yStart);
        doc.text(doc.splitTextToSize(experiencia, 170), 20, yStart + 10);
  
        const yFormacao = yStart + 10 + doc.splitTextToSize(experiencia, 170).length * 10;
        doc.text("Formação Acadêmica:", 20, yFormacao);
        doc.text(doc.splitTextToSize(formacao, 170), 20, yFormacao + 10);
  
        // Salva o PDF sem foto
        doc.save("curriculo_profissional.pdf");
      }
    });
  };
  