export const ieltsData = {
    // WRITING BO'LIMI
    writing: [
        {
            id: 'w1',
            difficulty_level: 1,
            title: 'Part 1: Daily Routine',
            instruction: 'Minimum 50 words.',
            question_text: 'Describe your typical day at university or work. What tasks do you perform most often?'
        },
        {
            id: 'w2',
            difficulty_level: 2,
            title: 'Part 2: Global Issues',
            instruction: 'Minimum 80 words.',
            question_text: 'Do you think international travel has a positive or negative effect on local cultures? Explain why.'
        },
        {
            id: 'w3',
            difficulty_level: 3,
            title: 'Part 3: Technology',
            instruction: 'Minimum 120 words.',
            question_text: 'Some people argue that social media does more harm than good to teenagers. To what extent do you agree or disagree?'
        }
    ],



















    reading: [
        {
            id: 'r1',
            difficulty_level: 1,
            title: "The Secrets of the Maya Civilization",
            passage_text: `The Maya civilization was a Mesoamerican civilization developed by the Maya peoples, and noted for its logosyllabic script—the most sophisticated and highly developed writing system in pre-Columbian Americas—as well as for its art, architecture, mathematics, calendar, and astronomical system. 
The Maya lived in a vast area that encompasses modern-day Guatemala, Belize, southeastern Mexico, and the western parts of Honduras and El Salvador. Contrary to popular belief, the Maya did not disappear. Although their classic cities in the lowlands were abandoned in the 9th century, Maya people still live in the same region today, speaking more than 30 different languages.
Their agricultural success was based on maize, beans, and squash. They developed advanced irrigation systems to manage water during the dry seasons. However, scholars still debate what caused the collapse of their major cities, with theories ranging from overpopulation and environmental degradation to warfare and severe drought.`,
            instruction: "Questions 1-13: Choose the correct answer based on the passage.",
            questions: [
                { id: 'rq1', question_number: 1, question_text: "What was the most sophisticated system developed by the Maya?", options: ["Logosyllabic script", "Iron smelting", "Steam engines", "Ocean navigation"], correct_answer: "Logosyllabic script" },
                { id: 'rq2', question_number: 2, question_text: "True or False: The Maya civilization was located in modern-day Europe.", options: ["True", "False"], correct_answer: "False" },
                { id: 'rq3', question_number: 3, question_text: "Which of the following was NOT a primary crop for the Maya?", options: ["Maize", "Beans", "Squash", "Wheat"], correct_answer: "Wheat" },
                { id: 'rq4', question_number: 4, question_text: "In which century were the lowland cities abandoned?", options: ["5th century", "9th century", "12th century", "15th century"], correct_answer: "9th century" },
                { id: 'rq5', question_number: 5, question_text: "True or False: Maya people still live in the region today.", options: ["True", "False"], correct_answer: "True" },
                { id: 'rq6', question_number: 6, question_text: "How many languages are still spoken by the Maya today?", options: ["None", "More than 30", "Exactly 5", "Only 1"], correct_answer: "More than 30" },
                { id: 'rq7', question_number: 7, question_text: "What did the Maya use to handle water during dry periods?", options: ["Dams", "Buckets", "Irrigation systems", "Rainwater only"], correct_answer: "Irrigation systems" },
                { id: 'rq8', question_number: 8, question_text: "Which theory is NOT mentioned as a reason for the collapse?", options: ["Overpopulation", "Severe drought", "Alien invasion", "Warfare"], correct_answer: "Alien invasion" },
                { id: 'rq9', question_number: 9, question_text: "True or False: The Maya script was logosyllabic.", options: ["True", "False"], correct_answer: "True" },
                { id: 'rq10', question_number: 10, question_text: "The Maya region includes which modern-day country?", options: ["Guatemala", "Brazil", "Canada", "Egypt"], correct_answer: "Guatemala" },
                { id: 'rq11', question_number: 11, question_text: "What was the main focus of Maya astronomical systems?", options: ["Stars and calendars", "Finding gold", "Building ships", "Telephones"], correct_answer: "Stars and calendars" },
                { id: 'rq12', question_number: 12, question_text: "Environmental degradation is a theory for what?", options: ["City growth", "City collapse", "New language", "Better crops"], correct_answer: "City collapse" },
                { id: 'rq13', question_number: 13, question_text: "True or False: Maya architecture is still studied today.", options: ["True", "False"], correct_answer: "True" }
            ]
        },
        {
            id: 'r2',
            difficulty_level: 2,
            title: "The Psychology of Urban Planning",
            passage_text: `Urban planning is not just about buildings and roads; it is about how the environment affects the human mind. High-rise buildings and narrow streets can create a sense of confinement, whereas green spaces and open plazas improve mental well-being.
In the 1960s, architect Jan Gehl began studying how people used public spaces in Copenhagen. He noticed that when cities prioritize cars, social interaction decreases. Conversely, pedestrian-friendly zones encourage people to stop, talk, and engage with their surroundings. 
Modern 'Smart Cities' use data to optimize traffic flow and energy use. However, some critics argue that an over-reliance on technology can make cities feel sterile and impersonal. The challenge for future planners is to balance technological efficiency with the biological need for nature and social connection.`,
            instruction: "Questions 14-27: Select the best answer for the urban planning analysis.",
            questions: [
                { id: 'rq14', question_number: 14, question_text: "Who studied public spaces in Copenhagen in the 1960s?", options: ["Jan Gehl", "Albert Einstein", "Steve Jobs", "Robert Moses"], correct_answer: "Jan Gehl" },
                { id: 'rq15', question_number: 15, question_text: "What happens to social interaction when cities prioritize cars?", options: ["It increases", "It stays the same", "It decreases", "It becomes digital"], correct_answer: "It decreases" },
                { id: 'rq16', question_number: 16, question_text: "True or False: High-rise buildings can create a sense of confinement.", options: ["True", "False"], correct_answer: "True" },
                { id: 'rq17', question_number: 17, question_text: "What do pedestrian-friendly zones encourage people to do?", options: ["Drive faster", "Engage with surroundings", "Stay home", "Build more roads"], correct_answer: "Engage with surroundings" },
                { id: 'rq18', question_number: 18, question_text: "What is a characteristic of 'Smart Cities' mentioned in the text?", options: ["No cars allowed", "Use data to optimize traffic", "Free housing", "Large farms"], correct_answer: "Use data to optimize traffic" },
                { id: 'rq19', question_number: 19, question_text: "True or False: Critics think technology always makes cities better.", options: ["True", "False"], correct_answer: "False" },
                { id: 'rq20', question_number: 20, question_text: "What biological need must planners balance with technology?", options: ["The need for speed", "Social connection and nature", "The need for metal", "The need for electricity"], correct_answer: "Social connection and nature" },
                { id: 'rq21', question_number: 21, question_text: "According to the text, narrow streets can affect what?", options: ["Car engine life", "The human mind", "Internet speed", "Water quality"], correct_answer: "The human mind" },
                { id: 'rq22', question_number: 22, question_text: "Copenhagen was the site of which researcher's work?", options: ["Jan Gehl", "Plato", "Newton", "Tesla"], correct_answer: "Jan Gehl" },
                { id: 'rq23', question_number: 23, question_text: "True or False: Urban planning is only about roads.", options: ["True", "False"], correct_answer: "False" },
                { id: 'rq24', question_number: 24, question_text: "What does 'sterile' city mean in this context?", options: ["Very clean", "Impersonal and cold", "Full of hospitals", "No traffic"], correct_answer: "Impersonal and cold" },
                { id: 'rq25', question_number: 25, question_text: "Open plazas are mentioned to improve what?", options: ["Mental well-being", "Shopping rates", "Car parking", "Building height"], correct_answer: "Mental well-being" },
                { id: 'rq26', question_number: 26, question_text: "What decade did Gehl start his studies?", options: ["1920s", "1960s", "1990s", "2010s"], correct_answer: "1960s" },
                { id: 'rq27', question_number: 27, question_text: "True or False: Smart cities use data for energy use.", options: ["True", "False"], correct_answer: "True" }
            ]
        },
        {
            id: 'r3',
            difficulty_level: 3,
            title: "Bioluminescence: Nature’s Cold Light",
            passage_text: `Bioluminescence is the production and emission of light by a living organism. It occurs widely in marine vertebrates and invertebrates, as well as in some fungi and terrestrial insects such as fireflies. 
The chemical reaction that results in bioluminescence requires two unique chemicals: luciferin and either luciferase or photoprotein. Luciferin is the compound that actually produces the light. The color of the light depends on the specific arrangement of luciferin molecules.
Organisms use this ability for various survival strategies. For example, the deep-sea anglerfish uses a glowing lure to attract prey, while some species of squid use 'counter-illumination' to camouflage themselves against the sunlight coming from above. In the medical field, bioluminescence is being used to track the spread of diseases and monitor cellular processes in real-time.`,
            instruction: "Questions 28-40: Scientific analysis questions.",
            questions: [
                { id: 'rq28', question_number: 28, question_text: "What is bioluminescence primarily?", options: ["Reflected sunlight", "Light produced by organisms", "Heat from the ocean", "Electricity from rocks"], correct_answer: "Light produced by organisms" },
                { id: 'rq29', question_number: 29, question_text: "Where is bioluminescence widely found?", options: ["Outer space", "Marine vertebrates", "Only in deserts", "In volcanoes"], correct_answer: "Marine vertebrates" },
                { id: 'rq30', question_number: 30, question_text: "Which chemical actually produces the light?", options: ["Luciferase", "Luciferin", "Hydrogen", "Carbon"], correct_answer: "Luciferin" },
                { id: 'rq31', question_number: 31, question_text: "True or False: Luciferin requires a photoprotein or luciferase to work.", options: ["True", "False"], correct_answer: "True" },
                { id: 'rq32', question_number: 32, question_text: "What determines the color of the light?", options: ["Water temperature", "Luciferin molecule arrangement", "The depth of the sea", "The size of the animal"], correct_answer: "Luciferin molecule arrangement" },
                { id: 'rq33', question_number: 33, question_text: "How does the deep-sea anglerfish use light?", options: ["To scare prey", "To attract prey", "To find a home", "To sleep"], correct_answer: "To attract prey" },
                { id: 'rq34', question_number: 34, question_text: "True or False: Some squid use light for camouflage.", options: ["True", "False"], correct_answer: "True" },
                { id: 'rq35', question_number: 35, question_text: "What is 'counter-illumination'?", options: ["Turning off light", "Using light to hide against sunlight", "Fighting with light", "Heating the water"], correct_answer: "Using light to hide against sunlight" },
                { id: 'rq36', question_number: 36, question_text: "How is bioluminescence used in medicine?", options: ["To cure blindness", "To track disease spread", "To perform surgery", "To clean hospitals"], correct_answer: "To track disease spread" },
                { id: 'rq37', question_number: 37, question_text: "True or False: Fireflies are terrestrial insects that use bioluminescence.", options: ["True", "False"], correct_answer: "True" },
                { id: 'rq38', question_number: 38, question_text: "Which organism is NOT mentioned as using bioluminescence?", options: ["Squid", "Fireflies", "Anglerfish", "Lions"], correct_answer: "Lions" },
                { id: 'rq39', question_number: 39, question_text: "What chemical reaction result is bioluminescence?", options: ["Cold light", "Hot fire", "Smoke", "Ice"], correct_answer: "Cold light" },
                { id: 'rq40', question_number: 40, question_text: "True or False: Bioluminescence can monitor cellular processes.", options: ["True", "False"], correct_answer: "True" }
            ]
        }
    ]
    ,





















    // LISTENING BO'LIMI (Keyinchalik audio fayllar bilan to'ldirish uchun)
    listening: [
        // PART 1 (Avvalgi Preston Park Run)
        {
            id: 'preston_park_run_01',
            part: 1,
            title: "Preston Park Run - Registration and Volunteering",
            audio_url: "/audio/test1.mp3",
            instruction: "Questions 1-10: Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            questions: [
                { id: 'l1_q1', question_number: 1, question_text: "Start of run: in front of the _______", correct_answer: "CAFE" },
                { id: 'l1_q2', question_number: 2, question_text: "Time of start: _______", correct_answer: "9 AM" },
                { id: 'l1_q3', question_number: 3, question_text: "Length of run: _______", correct_answer: "5 KM" },
                { id: 'l1_q4', question_number: 4, question_text: "At end of run: volunteer scans _______", correct_answer: "BARCODE" },
                { id: 'l1_q5', question_number: 5, question_text: "Best way to register: on the _______", correct_answer: "WEBSITE" },
                { id: 'l1_q6', question_number: 6, question_text: "Cost of run: £ _______", correct_answer: "FREE" },
                { id: 'l1_q7', question_number: 7, question_text: "Contact name: Pete _______", correct_answer: "SULLIVAN" },
                { id: 'l1_q8', question_number: 8, question_text: "Phone number: _______", correct_answer: "01444 732900" },
                { id: 'l1_q9', question_number: 9, question_text: "Activities: setting up course, _______ the runners", correct_answer: "GUIDING" },
                { id: 'l1_q10', question_number: 10, question_text: "_______ for the weekly report", correct_answer: "TAKING PHOTOS" }
            ]
        },

        // PART 2 (Yangi Short Story Competition)
        {
            id: 'short_story_comp_02',
            part: 2,
            title: "Short Story Competition - Entry and Prize Details",
            audio_url: "/audio/test2.mp3", // Ikkinchi audio faylingiz
            instruction: "Questions 1-10: Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            questions: [
                // Questions 1-6
                {
                    id: 'l2_q1',
                    question_number: 1,
                    question_text: "Length of story: approximately _______",
                    correct_answer: ""
                },
                {
                    id: 'l2_q2',
                    question_number: 2,
                    question_text: "Story must include: a _______",
                    correct_answer: ""
                },
                {
                    id: 'l2_q3',
                    question_number: 3,
                    question_text: "Minimum age: _______",
                    correct_answer: ""
                },
                {
                    id: 'l2_q4',
                    question_number: 4,
                    question_text: "Last entry date: 1st _______",
                    correct_answer: ""
                },
                {
                    id: 'l2_q5',
                    question_number: 5,
                    question_text: "Web address: www. _______ .com",
                    correct_answer: ""
                },
                {
                    id: 'l2_q6',
                    question_number: 6,
                    question_text: "Don’t: _______ the story to the organisers",
                    correct_answer: ""
                },

                // Questions 7-10
                {
                    id: 'l2_q7',
                    question_number: 7,
                    question_text: "The competition is judged by _______ .",
                    correct_answer: ""
                },
                {
                    id: 'l2_q8',

                    question_number: 8,
                    question_text: "The top five stories will be available _______ .",
                    correct_answer: ""
                },
                {
                    id: 'l2_q9',

                    question_number: 9,
                    question_text: "The top story will be chosen by the _______ .",
                    correct_answer: ""
                },
                {
                    id: 'l2_q10',

                    question_number: 10,
                    question_text: "The first prize is a place at a writers' workshop in _______",
                    correct_answer: ""
                }
            ]
        },
        // Part 3 uchun ham shunga o'xshash tuzilishga ega bo'lgan ma'lumotlar qo'shishingiz mumkin, audio fayllar bilan to'ldirish uchun.
        {
            id: 'sarahs_health_fitness_03',
            part: 3,
            title: "Sarah's Health & Fitness Club - Membership Form",
            audio_url: "/audio/test3.mp3", // Uchinchi audio faylingiz nomi
            instruction: "Questions 1-5: Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER. Questions 6-10: Answer the questions. Write NO MORE THAN TWO WORDS.",
            questions: [
                // Questions 1-5: Membership Form
                {
                    id: 'l3_q1',
                    question_number: 1,
                    question_text: "Last name: _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q2',
                    question_number: 2,
                    question_text: "Date of Birth (Year): _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q3',
                    question_number: 3,
                    question_text: "Type of Membership: _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q4',
                    question_number: 4,
                    question_text: "Activities: Badminton and _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q5',
                    question_number: 5,
                    question_text: "Payment details: To be paid _______",
                    correct_answer: ""
                },

                // Questions 6-10: Lifestyle questionnaire
                {
                    id: 'l3_q6',
                    question_number: 6,
                    question_text: "What exercise do you do regularly? _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q7',
                    question_number: 7,
                    question_text: "Do you have any injuries? has a _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q8',
                    question_number: 8,
                    question_text: "What is your goal or target? a better _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q9',
                    question_number: 9,
                    question_text: "What is your occupation? a _______",
                    correct_answer: ""
                },
                {
                    id: 'l3_q10',
                    question_number: 10,
                    question_text: "How did you hear about the club? _______",
                    correct_answer: ""
                }
            ]
        }
    ],
    // ieltsData.js ichiga qo'shish

  speaking: [
    {
      id: "s1",
      part: 1,
      title: "Introduction and Interview",
      questions: [
        "Let's talk about your home town. Where is it?",
        "What do you like about your home town?",
        "Is it a good place for young people to live?"
      ]
    },
    {
      id: "s2",
      part: 2,
      title: "Cue Card (Long Turn)",
      instruction: "Describe a beautiful place you have visited. You should say:",
      points: [
        "Where it is",
        "When you went there",
        "Who you went with",
        "And explain why you think it is beautiful."
      ]
    }
  ]
};
