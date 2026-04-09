export const cefrData = {
  listening: [
    // --- TEST 4: Community Centre Evening Classes ---
    {
      id: 1,
      title: "Community Centre Evening Classes - Test 4",
      audioUrl: "/audio/cefr/cefrtest1.mp3",
      tableQuestions: [
        { id: 1, label: "Painting starts at", type: "number", suffix: "pm" },
        { id: 2, label: "Bring water jar and set of", type: "text" },
        { id: 3, label: "Maori class location", type: "text" },
        { id: 4, label: "Maori class starts in", type: "text" },
        { id: 5, label: "Bring for camera", type: "text" },
        { id: 6, label: "Photography cost", type: "number", prefix: "£" }
      ],
      sentences: [
        { id: 7, text: "The watercolours class suits people who are _________." },
        { id: 8, text: "To find out about the Maori language class, contact Jason _________." },
        { id: 9, text: "For the photography class, check the _________ for the camera." },
        { id: 10, text: "There is a trip to a local _________ in the final week." }
      ],
      answers: {
        1: "1.30", 2: "brushes", 3: "back", 4: "June", 5: "manual",
        6: "65", 7: "beginners", 8: "King", 9: "battery", 10: "gallery"
      }
    },

    // --- TEST 5: City Transport Lost Property Enquiry ---
    {
      id: 2,
      title: "City Transport Lost Property Enquiry - Test 5",
      audioUrl: "/audio/cefr/cefrtest2.mp3",
      tableQuestions: [
        { id: 1, label: "Main item lost: black with thin _______ stripes", type: "text" },
        { id: 2, label: "Other items: a set of _______ keys", type: "text" },
        { id: 3, label: "Other items: a _______ in a box", type: "text" },
        { id: 4, label: "Other items: a blue _______", type: "text" }
      ],
      sentences: [
        { id: 5, text: "Date and time: 2.00 - 2.30 pm on _________." },
        { id: 6, text: "Basic route: caller travelled from the _________ to Highbury." },
        { id: 7, text: "Mode of travel: caller thinks she left the suitcase in a _________." },
        { id: 8, text: "Name: Lisa _________." },
        { id: 9, text: "Address: 15A _________ Rd, Highbury." },
        { id: 10, text: "Phone number: _________." }
      ],
      answers: {
        1: "blue", 2: "house", 3: "present", 4: "umbrella", 5: "Tuesday",
        6: "airport", 7: "taxi", 8: "Dermot", 9: "Canterbury", 10: "07979605437"
      }
    },

    // --- TEST 6: Accommodation Form Rental Properties ---
    {
      id: 3,
      title: "Accommodation Form: Rental Properties - Test 6",
      audioUrl: "/audio/cefr/cefrtest3.mp3",
      tableQuestions: [
        { id: 1, label: "Contact phone number: 1 (0044)", type: "text" },
        { id: 2, label: "Email address: richard@", suffix: ".co.uk", type: "text" },
        { id: 3, label: "Occupation: a local", type: "text" },
        { id: 4, label: "Apartment must have its own", type: "text" }
      ],
      sentences: [
        { id: 5, text: "No _________ required (family bringing theirs)." },
        { id: 6, text: "A _________ in the kitchen is preferable." },
        { id: 7, text: "Preferred location: near a _________." },
        { id: 8, text: "Maximum rent: £_________ per month.", type: "number" },
        { id: 9, text: "The accommodation has to be _________ in the daytime." },
        { id: 10, text: "First heard about us through a _________." }
      ],
      answers: {
        1: "2086132978", 2: "george", 3: "doctor", 4: "garden", 5: "furniture",
        6: "dishwasher", 7: "university", 8: "950", 9: "quiet", 10: "friend"
      }
    }
  ],
  reading: {
    title: "CEFR/IELTS Academic Reading Mock Test",
    passages: [
      // --- PASSAGE 1: The Evolution of Human Transport ---
      {
        id: 1,
        title: "The Evolution of the Bicycle",
        text: "The bicycle is hailed as one of the most mechanically efficient forms of transport ever conceived. Its journey began in 1817 when Baron Karl von Drais invented the 'dandy horse'—a wooden frame with two wheels but no pedals, requiring the rider to push against the ground. By the 1860s, the 'Boneshaker' emerged, introducing pedals attached directly to the front axle. However, its rigid iron tires and wooden frame made for an incredibly jarring ride on cobblestones. The 1870s saw the rise of the 'Penny Farthing', distinguishable by its massive front wheel. While it allowed for greater speeds, its high center of gravity made it notoriously dangerous, often leading to 'headers' (falling forward over the handlebars). The breakthrough came in 1885 with John Kemp Starley's 'Safety Bicycle'. Featuring two wheels of equal size and a revolutionary chain-driven rear wheel, this design provided stability and safety, forming the blueprint for all modern bicycles. Today, with over a billion units globally, the bicycle remains a cornerstone of sustainable urban mobility.",
        questions: [
          // Faqat 2 ta True/False
          { id: 1, text: "The 'dandy horse' required the rider to use a chain drive to move.", options: ["True", "False", "Not Given"], correct: "B" },
          { id: 2, text: "The 'Safety Bicycle' was the first to use wheels of equal dimensions.", options: ["True", "False", "Not Given"], correct: "A" },
          // Qolganlari Test (Multiple Choice)
          { id: 3, text: "Why was the 1860s bicycle nicknamed the 'Boneshaker'?", options: ["A. It was made of human bones", "B. Its iron tires made the ride very rough", "C. It was used primarily by doctors", "D. It was very light and fragile"], correct: "B" },
          { id: 4, text: "What was the main disadvantage of the 'Penny Farthing'?", options: ["A. It was too slow", "B. It had no pedals", "C. It was prone to dangerous falls", "D. It was made of expensive gold"], correct: "C" },
          { id: 5, text: "Who is credited with creating the basic design used for bicycles today?", options: ["A. Baron Karl von Drais", "B. John Kemp Starley", "C. A group of athletes", "D. Anonymous French inventors"], correct: "B" },
          { id: 6, text: "How many bicycles are estimated to exist in the world today?", options: ["A. Under a million", "B. Exactly 500 million", "C. Over one billion", "D. Two billion"], correct: "C" },
          { id: 7, text: "The dandy horse was primarily constructed from what material?", options: ["A. Steel", "B. Carbon fiber", "C. Wood", "D. Aluminum"], correct: "C" },
          // Gap Fill
          { id: 8, text: "The first pedal-less bicycle was known as the _________ horse.", type: "input", correct: "dandy" },
          { id: 9, text: "The Boneshaker's tires were made of _________.", type: "input", correct: "iron" },
          { id: 10, text: "The Penny Farthing is famous for its _________ front wheel.", type: "input", correct: "massive" },
          { id: 11, text: "The Safety Bicycle was developed in the year _________.", type: "input", correct: "1885" },
          { id: 12, text: "The modern bicycle design uses a _________ drive system for the rear wheel.", type: "input", correct: "chain" },
          { id: 13, text: "Bicycles are a key part of sustainable urban _________.", type: "input", correct: "mobility" }
        ]
      },
      // --- PASSAGE 2: The Biological Necessity of Sleep ---
      {
        id: 2,
        title: "The Science of Sleep",
        text: "Sleep is far from a passive state; it is a complex neurological process essential for survival. During the night, the brain cycles through Non-REM and REM (Rapid Eye Movement) stages. REM sleep is particularly fascinating because, while the body remains paralyzed, the brain's activity levels mimic those of wakefulness. This is the stage where vivid dreaming occurs and emotional memories are processed. Scientists have found that sleep is critical for 'neuroplasticity'—the brain's ability to reorganize itself by forming new neural connections. Chronic sleep deprivation does more than cause tiredness; it severely impairs the prefrontal cortex, leading to poor decision-making and emotional instability. Furthermore, modern technology has introduced 'blue light' interference. Smartphones and laptops emit light that tricks the pineal gland into halting the production of melatonin, the hormone responsible for regulating our sleep-wake cycle. For teenagers, this is exacerbated by a delayed circadian rhythm, which naturally pushes their alertness into the late-night hours.",
        questions: [
          // Faqat 2 ta True/False
          { id: 14, text: "During REM sleep, the brain is less active than during deep sleep.", options: ["True", "False", "Not Given"], correct: "B" },
          { id: 15, text: "Melatonin is a hormone that helps the body prepare for sleep.", options: ["True", "False", "Not Given"], correct: "A" },
          // Testlar
          { id: 16, text: "What is 'neuroplasticity' mentioned in the text?", options: ["A. A type of plastic surgery", "B. The brain's ability to form new connections", "C. A disease caused by lack of sleep", "D. The process of dreaming"], correct: "B" },
          { id: 17, text: "How does blue light affect the body?", options: ["A. It improves eyesight", "B. It speeds up digestion", "C. It stops the production of melatonin", "D. It helps teenagers wake up early"], correct: "C" },
          { id: 18, text: "Which part of the brain is most affected by sleep loss?", options: ["A. The heart valve", "B. The prefrontal cortex", "C. The optical nerve", "D. The spinal cord"], correct: "B" },
          { id: 19, text: "Why is REM sleep unique?", options: ["A. The body moves a lot", "B. It only happens in the morning", "C. The brain activity is similar to being awake", "D. It is the only time we rest"], correct: "C" },
          { id: 20, text: "What is the natural sleep tendency of teenagers called?", options: ["A. Early bird syndrome", "B. Delayed circadian rhythm", "C. Chronic insomnia", "D. Rapid Eye Movement"], correct: "B" },
          // Gap Fill
          { id: 21, text: "REM stands for Rapid _________ Movement.", type: "input", correct: "Eye" },
          { id: 22, text: "The brain processes _________ memories during REM sleep.", type: "input", correct: "emotional" },
          { id: 23, text: "Sleep deprivation leads to poor _________ making.", type: "input", correct: "decision" },
          { id: 24, text: "The _________ gland produces melatonin.", type: "input", correct: "pineal" },
          { id: 25, text: "Smartphones emit _________ light that disrupts sleep.", type: "input", correct: "blue" },
          { id: 26, text: "Sleep is a complex _________ process.", type: "input", correct: "neurological" }
        ]
      },
      // --- PASSAGE 3: The Ethics of the Digital Mind ---
      {
        id: 3,
        title: "The Ethical Dilemmas of AI",
        text: "Artificial Intelligence (AI) has transitioned from science fiction to the backbone of modern infrastructure. While AI offers unparalleled benefits in medical diagnostics and logistics, it also presents profound ethical risks. Central to this debate is 'algorithmic bias'. AI models are trained on massive datasets that often reflect historical human prejudices. Consequently, an AI used in judicial sentencing or recruitment might unintentionally discriminate against minority groups or genders. Another pressing concern is the 'black box' problem—many advanced AI systems make decisions that even their creators cannot fully explain. This lack of transparency has led to a global push for 'Explainable AI' (XAI), which mandates that AI logic must be interpretable by humans. Additionally, the rise of 'Deepfakes' has created a crisis of truth, allowing for the manipulation of video and audio with terrifying realism. As AI continues to evolve, society must decide how to assign accountability: is the software developer, the user, or the algorithm itself responsible when things go wrong?",
        questions: [
          // Faqat 2 ta True/False
          { id: 27, text: "AI creators always understand exactly how their models make decisions.", options: ["True", "False", "Not Given"], correct: "B" },
          { id: 28, text: "Deepfakes involve the manipulation of digital media.", options: ["True", "False", "Not Given"], correct: "A" },
          // Testlar
          { id: 29, text: "What is the 'black box' problem in AI?", options: ["A. AI hardware is usually painted black", "B. The inability to explain AI's decision process", "C. A type of airplane flight recorder", "D. AI's tendency to shut down randomly"], correct: "B" },
          { id: 30, text: "Why might an AI recruitment tool be biased?", options: ["A. It gets tired", "B. It is trained on historical data containing prejudices", "C. It prefers computers over humans", "D. It is programmed to be mean"], correct: "B" },
          { id: 31, text: "What does XAI stand for?", options: ["A. X-tra Artificial Intelligence", "B. Xylophone Automated Interface", "C. Explainable Artificial Intelligence", "D. External AI"], correct: "C" },
          { id: 32, text: "In which field is AI mentioned as providing unparalleled benefits?", options: ["A. Cooking", "B. Medical diagnostics", "C. Gardening", "D. Fashion"], correct: "B" },
          { id: 33, text: "The text mentions a crisis of truth caused by what?", options: ["A. Lack of books", "B. Algorithmic bias", "C. Deepfakes", "D. High energy costs"], correct: "C" },
          // Gap Fill
          { id: 34, text: "AI has become the backbone of modern _________.", type: "input", correct: "infrastructure" },
          { id: 35, text: "The problem of AI reflecting human prejudice is called _________ bias.", type: "input", correct: "algorithmic" },
          { id: 36, text: "AI is used in judicial _________ and recruitment.", type: "input", correct: "sentencing" },
          { id: 37, text: "XAI experts believe AI logic must be _________ by humans.", type: "input", correct: "interpretable" },
          { id: 38, text: "Videos that are realistic but fake are called _________.", type: "input", correct: "Deepfakes" },
          { id: 39, text: "There is a debate about who should hold _________ for AI errors.", type: "input", correct: "accountability" },
          { id: 40, text: "AI systems often act as a _________ box because of their complexity.", type: "input", correct: "black" }
        ]
      }
    ]
  },







  // Writing Section
  writing: {
    title: "CEFR/IELTS Writing Mock Test",
    passages: [
      {
        id: 1,
        type: "Easy (Task 1)",
        wordLimit: 60,
        title: "Describing a Personal Experience",
        instruction: "Write a short letter to a friend (at least 60 words) describing your last weekend trip to the mountains.",
      },
      {
        id: 2,
        type: "Hard (Task 2)",
        wordLimit: 100,
        title: "Impact of Artificial Intelligence",
        instruction: "Write a short essay (at least 100 words) discussing the advantages and disadvantages of using AI in education.",
      }
    ]
  },








  // Speaking Section
  speaking: {
    title: "CEFR Speaking Mock Test",
    passages: [
      {
        id: 1,
        part: "Part 1: Introduction",
        title: "Hometown and Studies",
        questions: ["Can you describe the town or city where you live?"]
      },
      {
        id: 2,
        part: "Part 2: Cue Card",
        title: "A Memorable Journey",
        questions: [
          "Describe a journey you remember well. You should say where you went, how you travelled, who you went with, and explain why it was memorable."
        ]
      },
      {
        id: 3,
        part: "Part 3: Discussion",
        title: "Travel & Society",
        questions: ["Do you think people will travel more or less in the future? Why?"]
      }
    ]
  }


};