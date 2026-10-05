

const CATEGORY_LABELS = {
  usurpation: "Usurpation d'identité",
  lien: "Lien / URL suspect",
  urgence: "Urgence & pression",
  donnees: "Demande de données sensibles",
  piecejointe: "Pièce jointe suspecte",
  mdp: "Mots de passe",
  authentification: "Authentification (2FA)",
  maj: "Mises à jour & logiciels",
  wifi: "Réseaux Wi-Fi publics",
  sauvegarde: "Sauvegardes & ransomware",
  ing_sociale: "Ingénierie sociale"
};

// Base complète des 25 questions
const ALL_QUESTIONS = [
  // --- SIMULATIONS PHISHING (1-12) ---
  {
    id: 1, type: "phishing", isPhishing: true, categories: ["urgence", "lien"],
    from: "securite@credit-agricol.fr", subject: "⚠️ Suspension immédiate de votre compte",
    body: "Nous avons détecté une activité inhabituelle sur votre compte.\nCliquez ici sous 24h pour éviter la fermeture définitive de votre compte :",
    link: "http://credit-agricole-secure-verify.com/login",
    explanation: "Le domaine contient une faute d'orthographe (« credit-agricol »), crée une urgence artificielle et renvoie vers une URL suspecte."
  },
  {
    id: 2, type: "phishing", isPhishing: false, categories: ["lien"],
    from: "newsletter@fnac.com", subject: "Vos offres de la semaine",
    body: "Découvrez notre sélection high-tech avec jusqu'à -30% de réduction.\nVoir toutes les offres :",
    link: "https://www.fnac.com/promotions",
    explanation: "Message légitime. L'expéditeur utilise le vrai domaine fnac.com et le lien redirige vers le site officiel sans demander de données sensibles."
  },
  {
    id: 3, type: "phishing", isPhishing: true, categories: ["lien", "urgence"],
    from: "notification@colissimo-suivi-fr.com", subject: "📦 Votre colis est en attente : frais de douane à régler",
    body: "Votre colis ne peut être livré tant que des frais de 2,99€ n'ont pas été réglés.\nRégularisez votre situation sous 48h :",
    link: "http://colissimo-paiement-douane.com/pay",
    explanation: "Arnaque classique aux frais de port. La Poste / Colissimo ne demande jamais de paiement sur des sites tiers."
  },
  {
    id: 4, type: "phishing", isPhishing: true, categories: ["donnees", "usurpation"],
    from: "support@impots-gouv-fr.net", subject: "Remboursement d'impôt d'un montant de 380,50 €",
    body: "Après vérification de votre déclaration, un remboursement est en votre faveur. Remplissez le formulaire bancaire pour recevoir le virement :",
    link: "http://impots-gouv-remboursement.info/form",
    explanation: "L'administration fiscale ne demande jamais la saisie directe de coordonnées bancaires par e-mail."
  },
  {
    id: 5, type: "phishing", isPhishing: true, categories: ["usurpation", "piecejointe"],
    from: "rh-paie@societe-facture.com", subject: "Facture N° 849204 non réglée - Relance",
    body: "Veuillez trouver en pièce jointe la facture impayée relative au mois dernier. Merci de procéder au virement sous 3 jours.",
    link: "http://telecharger-facture-pdf.exe",
    explanation: "La pièce jointe camoufle un fichier exécutable (.exe). Ne cliquez jamais sur des pièces jointes suspectes."
  },
  {
    id: 6, type: "phishing", isPhishing: false, categories: ["authentification"],
    from: "no-reply@account.google.com", subject: "Code de vérification Google",
    body: "Votre code de vérification à deux facteurs est : 482910. Ne partagez ce code avec personne.",
    link: "",
    explanation: "Email de vérification légitime envoyé suite à une tentative de connexion. Il ne contient aucun lien piégé."
  },
  {
    id: 7, type: "phishing", isPhishing: true, categories: ["urgence", "donnees"],
    from: "service-client@netflix-abonnement.com", subject: "Mise à jour requise : Votre paiement a échoué",
    body: "Nous n'avons pas pu prélever votre dernier abonnement. Mettez à jour votre carte sous peine de résiliation immediate :",
    link: "http://netflix-login-update-payment.com",
    explanation: "Domaine non officiel et pression temporelle pour voler des identifiants bancaires."
  },
  {
    id: 8, type: "phishing", isPhishing: true, categories: ["ing_sociale"],
    from: "pdg-direction@gmail.com", subject: "URGENT : Achat de cartes cadeaux Apple",
    body: "Bonjour, je suis actuellement en réunion. Peux-tu acheter 5 cartes cadeaux Apple de 100€ au plus vite et m'envoyer les codes par mail ?",
    link: "",
    explanation: "Attaque du type « Arnaque au président ». Le PDG n'utiliserait jamais une adresse Gmail personnelle pour réclamer des cartes cadeaux."
  },
  {
    id: 9, type: "phishing", isPhishing: false, categories: ["lien"],
    from: "support@github.com", subject: "[GitHub] A new sign-in from Chrome on Windows",
    body: "We noticed a new sign-in to your GitHub account from a new device.",
    link: "https://github.com/settings/security",
    explanation: "Alerte de sécurité légitime redirigeant directement vers le domaine sécurisé https://github.com."
  },
  {
    id: 10, type: "phishing", isPhishing: true, categories: ["lien", "donnees"],
    from: "info@ameli-assurance-maladie.info", subject: "Nouvelle carte Vitale disponible",
    body: "Votre nouvelle carte Vitale V3 est disponible gratuitement. Effectuez la demande avant qu'elle ne soit périmée :",
    link: "http://carte-vitale-mise-a-jour.com",
    explanation: "Phishing récurrent. L'Assurance Maladie utilise uniquement le portail officiel ameli.fr."
  },
  {
    id: 11, type: "phishing", isPhishing: true, categories: ["urgence"],
    from: "securite@paypal-verification.org", subject: "Activités suspectes sur votre compte PayPal",
    body: "Une connexion depuis un pays étranger a été détectée. Veuillez confirmer votre identité :",
    link: "http://paypal-verification-center.net",
    explanation: "Faux domaine PayPal cherchant à intercepter vos identifiants."
  },
  {
    id: 12, type: "phishing", isPhishing: false, categories: ["lien"],
    from: "serviceclient@amazon.fr", subject: "Confirmation de votre commande N° 408-293810",
    body: "Merci pour votre commande. Retrouvez le récapitulatif dans votre espace client.",
    link: "https://www.amazon.fr/your-orders",
    explanation: "Email de confirmation officiel menant directement à l'espace client sécurisé Amazon."
  },

  // --- QUESTIONS DE CULTURE GÉNÉRALE (13-25) ---
  {
    id: 13, type: "quiz", categories: ["mdp"],
    question: "Laquelle de ces pratiques est la plus sûre pour créer un mot de passe ?",
    options: [
      "Utiliser son prénom suivi de son année de naissance",
      "Utiliser une phrase de passe longue, complexe et unique par service",
      "Utiliser le même mot de passe partout pour s'en souvenir",
      "Changer une seule lettre dans son mot de passe habituel"
    ],
    correctIndex: 1,
    explanation: "Une phrase de passe longue et unique par service est bien plus difficile à casser par force brute."
  },
  {
    id: 14, type: "quiz", categories: ["authentification"],
    question: "Qu'est-ce que l'authentification à deux facteurs (2FA / MFA) ?",
    options: [
      "Se connecter avec deux comptes différents simultanément",
      "Utiliser deux mots de passe l'un après l'autre",
      "Combiner deux preuves d'identité distinctes (ex: mot de passe + code SMS/application)",
      "Un logiciel antivirus qui vérifie les fichiers deux fois"
    ],
    correctIndex: 2,
    explanation: "La 2FA ajoute une couche de sécurité essentielle en combinant ce que vous savez (mot de passe) et ce que vous possédez (téléphone/clé)."
  },
  {
    id: 15, type: "quiz", categories: ["wifi"],
    question: "Quel est le risque principal lors de l'utilisation d'un Wi-Fi public non sécurisé ?",
    options: [
      "Le Wi-Fi décharge la batterie du téléphone plus rapidement",
      "Un pirate sur le même réseau peut intercepter vos communications non chiffrées",
      "Votre téléphone risque de s'éteindre soudainement",
      "Le réseau Wi-Fi efface automatiquement vos photos"
    ],
    correctIndex: 1,
    explanation: "Sur un Wi-Fi ouvert, un attaquant peut faire de l'écoute réseau (Eavesdropping) et lire les flux de données."
  },
  {
    id: 16, type: "quiz", categories: ["sauvegarde"],
    question: "Que garantit la règle de sauvegarde 3-2-1 ?",
    options: [
      "3 copies de vos données, sur 2 supports différents, dont 1 hors site (ex: cloud)",
      "3 sauvegardes par jour pendant 2 mois sur 1 seule clé USB",
      "3 mots de passe pour 2 dossiers sur 1 disque dur",
      "3 restaurations par an sur 2 serveurs différents"
    ],
    correctIndex: 0,
    explanation: "La règle 3-2-1 garantit que vous ne perdrez pas vos données en cas de panne physique, de vol ou de ransomware."
  },
  {
    id: 17, type: "quiz", categories: ["maj"],
    question: "Pourquoi est-il primordial d'installer rapidement les mises à jour du système d'exploitation ?",
    options: [
      "Pour changer la couleur de l'interface",
      "Pour libérer de l'espace sur le disque dur",
      "Pour corriger les failles de sécurité connues exploitables par des pirates",
      "Pour accélérer le débit de votre connexion Internet"
    ],
    correctIndex: 2,
    explanation: "Les mises à jour contiennent des correctifs (« patchs ») comblant des vulnérabilités de sécurité."
  },
  {
    id: 18, type: "quiz", categories: ["ing_sociale"],
    question: "Qu'est-ce que le 'Smishing' ?",
    options: [
      "Un virus informatique qui détruit le processeur",
      "Une tentative de phishing réalisée spécifiquement par SMS",
      "Une attaque qui bloque l'écran de l'ordinateur",
      "Une technique pourpirater un réseau Wi-Fi"
    ],
    correctIndex: 1,
    explanation: "Le Smishing est la contraction de 'SMS' et 'Phishing'."
  },
  {
    id: 19, type: "quiz", categories: ["donnees"],
    question: "Que devez-vous faire si vous recevez un e-mail suspect demandant la mise à jour de vos données bancaires ?",
    options: [
      "Répondre au mail pour demander si c'est vrai",
      "Cliquer sur le lien pour vérifier s'il s'agit du site officiel",
      "Ignorer/supprimer le mail et contacter directement l'organisme par un canal officiel",
      "Transférer le mail à tous vos amis"
    ],
    correctIndex: 2,
    explanation: "Ne cliquez jamais sur les liens. Passez directement par votre application habituelle ou le site officiel."
  },
  {
    id: 20, type: "quiz", categories: ["sauvegarde"],
    question: "Qu'est-ce qu'un Ransomware (Rançongiciel) ?",
    options: [
      "Un logiciel qui affiche des publicités intempestives",
      "Un logiciel malveillant qui chiffre vos fichiers et exige une rançon",
      "Un programme qui nettoie votre ordinateur gratuitement",
      "Un pare-feu de protection"
    ],
    correctIndex: 1,
    explanation: "Le ransomware verrouille vos données personnelles et réclame un paiement en cryptomonnaie pour les déchiffrer."
  },
  {
    id: 21, type: "quiz", categories: ["mdp"],
    question: "Où est-il recommandé de stocker de façon sécurisée une grande quantité de mots de passe ?",
    options: [
      "Dans un fichier texte nommé 'mots_de_passe.txt' sur le bureau",
      "Sur un post-it collé sur l'écran",
      "Dans un gestionnaire de mots de passe chiffré (Bitwarden, 1Password, Dashlane...)",
      "Dans la boîte de réception de sa messagerie"
    ],
    correctIndex: 2,
    explanation: "Les gestionnaires de mots de passe protègent vos identifiants via un chiffrement fort."
  },
  {
    id: 22, type: "quiz", categories: ["lien"],
    question: "Dans l'adresse web 'https://www.banque.securite-login.com/mon-compte', quel est le vrai nom de domaine ?",
    options: [
      "banque.com",
      "securite-login.com",
      "banque.securite-login.com",
      "mon-compte.com"
    ],
    correctIndex: 1,
    explanation: "Le domaine principal est juste avant l'extension (.com). Ici, 'banque' n'est qu'un sous-domaine d'un site piégé nommé 'securite-login.com'."
  },
  {
    id: 23, type: "quiz", categories: ["ing_sociale"],
    question: "Qu'est-ce que le 'Vishing' ?",
    options: [
      "Du phishing réalisé par appel téléphonique ou message vocal",
      "Un virus transmis par vidéo",
      "Une attaque sur une caméra web",
      "Un piratage de voiture à distance"
    ],
    correctIndex: 0,
    explanation: "Le Vishing (Voice Phishing) utilise le téléphone pour usurper l'identité d'un conseiller, policier ou technicien."
  },
  {
    id: 24, type: "quiz", categories: ["authentification"],
    question: "Pourquoi est-il risqué de recevoir ses codes 2FA uniquement par SMS ?",
    options: [
      "Les SMS coûtent trop cher",
      "Les SMS peuvent être interceptés via l'usurpaton de carte SIM (SIM Swapping)",
      "Les SMS effacent les messages reçus",
      "Les SMS ne marchent pas sur smartphone"
    ],
    correctIndex: 1,
    explanation: "Le SIM Swapping permet aux pirates de détourner votre numéro mobile. Il est préférable d'utiliser une application d'authentification (Google Auth, Authy)."
  },
  {
    id: 25, type: "quiz", categories: ["wifi"],
    question: "Quel outil permet de sécuriser vos données lors de connexions sur un Wi-Fi public ?",
    options: [
      "Un VPN (Réseau Privé Virtuel)",
      "Un lecteur PDF",
      "Un bloqueur de fenêtres surgissantes",
      "Un moteur de recherche privé"
    ],
    correctIndex: 0,
    explanation: "Un VPN chiffre tout le trafic entre votre appareil et le serveur, empêchant toute interception sur le réseau local."
  }
];

// Nombre total de questions à poser
const QUIZ_LENGTH = 25; 
let quiz = [];
let currentIndex = 0;
let score = 0;
let categoryStats = {};
let answered = false;

// Fonction de mélange aléatoire (Fisher-Yates)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const retryBtn = document.getElementById('retry-btn');
  const nextBtn = document.getElementById('next-btn');

  if (startBtn) startBtn.addEventListener('click', startQuiz);
  if (retryBtn) retryBtn.addEventListener('click', startQuiz);
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
});

function startQuiz() {
  // On mélange les 25 questions et on prend les 25
  quiz = shuffle(ALL_QUESTIONS).slice(0, QUIZ_LENGTH);
  currentIndex = 0;
  score = 0;
  categoryStats = {};
  Object.keys(CATEGORY_LABELS).forEach(k => categoryStats[k] = { correct: 0, total: 0 });
  
  document.getElementById('quiz-intro').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const q = quiz[currentIndex];
  document.getElementById('q-counter').textContent = `Question ${currentIndex + 1} / ${quiz.length}`;
  document.getElementById('q-score').textContent = `Score : ${score}`;
  document.getElementById('progress-fill').style.width = (currentIndex / quiz.length * 100) + '%';

  const msgWrap = document.getElementById('message-card-wrap');
  const quizCard = document.getElementById('quiz-question-card');
  const optionsContainer = document.getElementById('options-container');
  const typeTag = document.getElementById('type-tag');
  optionsContainer.innerHTML = '';

  if (q.type === 'phishing') {
    typeTag.textContent = '🎣 SIMULATION DE PHISHING';
    typeTag.className = 'type-tag phishing-tag';
    msgWrap.style.display = 'block';
    quizCard.style.display = 'none';

    document.getElementById('msg-head').innerHTML =
      `<div><b>De :</b> ${q.from}</div><div><b>Objet :</b> ${q.subject}</div>`;
    let bodyHtml = q.body.replace(/\n/g, '<br>');
    if (q.link) {
      bodyHtml += `<br><br><span style="color:#2563eb;text-decoration:underline;">${q.link}</span>`;
    }
    document.getElementById('msg-body').innerHTML = bodyHtml;

    optionsContainer.className = 'options dual';
    optionsContainer.innerHTML = `
      <button class="opt-btn" data-value="phishing">🚩 Tentative de phishing</button>
      <button class="opt-btn" data-value="legit">✅ Message légitime</button>`;
  } else {
    typeTag.textContent = '🛡 CULTURE CYBERSÉCURITÉ';
    typeTag.className = 'type-tag quiz-tag';
    msgWrap.style.display = 'none';
    quizCard.style.display = 'block';

    document.getElementById('q-text').textContent = q.question;

    optionsContainer.className = 'options mcq';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.dataset.value = String(idx);
      btn.textContent = opt;
      optionsContainer.appendChild(btn);
    });
  }

  optionsContainer.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => submitAnswer(btn.dataset.value, btn));
  });

  document.getElementById('feedback').style.display = 'none';
}

function submitAnswer(value, btnEl) {
  if (answered) return;
  answered = true;
  const q = quiz[currentIndex];

  let isCorrect, correctValue;
  if (q.type === 'phishing') {
    correctValue = q.isPhishing ? 'phishing' : 'legit';
    isCorrect = value === correctValue;
  } else {
    correctValue = String(q.correctIndex);
    isCorrect = value === correctValue;
  }

  if (isCorrect) score++;

  q.categories.forEach(cat => {
    if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
    categoryStats[cat].total++;
    if (isCorrect) categoryStats[cat].correct++;
  });

  const allBtns = document.querySelectorAll('#options-container .opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const correctBtn = document.querySelector(`#options-container .opt-btn[data-value="${correctValue}"]`);
  if (correctBtn) correctBtn.classList.add('correct');
  if (!isCorrect && btnEl) btnEl.classList.add('wrong');

  const fb = document.getElementById('feedback');
  fb.style.display = 'block';

  document.getElementById('verdict-text').textContent = isCorrect ? '✔ Bonne réponse' : '✘ Mauvaise réponse';
  document.getElementById('explanation-text').textContent = q.explanation;
  document.getElementById('q-score').textContent = `Score : ${score}`;

  const nextBtn = document.getElementById('next-btn');
  nextBtn.textContent = currentIndex === quiz.length - 1 ? 'Voir mon résultat →' : 'Question suivante →';
}

function nextQuestion() {
  if (!answered) return;
  currentIndex++;
  if (currentIndex >= quiz.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

function finishQuiz() {
  document.getElementById('progress-fill').style.width = '100%';
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';

  document.getElementById('final-score').textContent = `${score}/${quiz.length}`;
  const pct = Math.round((score / quiz.length) * 100);
  document.getElementById('final-label').textContent = `${pct}% de bonnes réponses`;

  let catHtml = '<b>Détail par catégorie :</b><br><br>';
  Object.keys(categoryStats).forEach(cat => {
    const s = categoryStats[cat];
    if (s.total > 0) {
      const p = Math.round((s.correct / s.total) * 100);
      catHtml += `${CATEGORY_LABELS[cat] || cat} : <b>${s.correct}/${s.total}</b> (${p}%)<br>`;
    }
  });
  document.getElementById('category-summary').innerHTML = catHtml;

  // --- SAUVEGARDE POUR LE TABLEAU DE BORD ---
  const history = JSON.parse(localStorage.getItem('cybersens_quiz_history') || '[]');
  
  const newAttempt = {
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    score: score,
    total: quiz.length,
    percentage: pct,
    categories: categoryStats
  };

  history.unshift(newAttempt); // Ajoute la tentative récente au début
  localStorage.setItem('cybersens_quiz_history', JSON.stringify(history));
}