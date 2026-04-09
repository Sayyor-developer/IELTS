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
    id: 'r_pencil_01',
    difficulty_level: 2,
    title: "The History of the Pencil",
    passage_text: `The history of the pencil starts with a violent thunderstorm. When some particularly ferocious weather struck the Lake District in North West England in the sixteenth century, locals in the village of Borrowdale discovered a large uprooted tree. Underneath the tree lay an unknown black substance which we now know as graphite. When a local farmer tried to use it to mark his sheep, he quickly identified their sheep. However, others quickly realised the potential for using this intriguing substance to write on paper. When it was untreated the material was very soft, which meant that it left messy marks on the page. It took a little while for people to encase it with a thin core of the substance in stiff sheep hides or rope. At this time chemistry was still in its infancy. People searched for a word to describe this increasingly useful substance and came up with plumbago which, in Latin, means ‘act like lead’. Later the name graphite was derived from the Greek word ‘graphein’ meaning ‘to write’. We still call graphite the lead of a pencil even though it is now known that there is no trace of real lead in graphite.
Graphite has a very high melting point at around 3,500 degrees Celsius. This made it invaluable to the British army and navy as a secret ingredient in the manufacture of cannon balls. The Royal Ordnance, or department of the British government responsible for the supply of weapons, used graphite as a lining inside the moulds for cannon balls, which as a result British could turn out faster and more cheaply than their European rivals. In addition to its value to the armed forces, the government quickly realised the commercial potential of the graphite at Borrowdale, and assumed control.
The history of the pencil continues with the story of all of the mines there during the sixteenth century. Armed guards accompanied the precious graphite all the way down to the metal foundries by the naval shipyards in the south of England. The graphite was so valuable that the locals, who called it wadd, started to steal it. As a deterrent, an act of parliament was passed to make it a serious offence punishable by time in prison.
The Italians originally invented the wooden casing to hold a thin rod of plumbago firmly in place and a process was developed to bake the mixture. The Germans took this technique and developed it further by applying mass production techniques to pencils. At the same time Nicolas-Jacques Conte, a French officer in Napoleon Bonaparte’s army during the late 1700s, developed a method of mixing powdered graphite with clay to make a stronger and more durable pencil. Adding more clay to the mixture helped make the pencil harder, sharper, and more precise in its mark. More graphite helped make a pencil mark that was softer, thicker and darker.
The varying quality of pencil leads eventually gave rise to a system for categorizing the fineness of the pencil mark. Pencil manufacturers all over the world still use this system, which was developed in Austria. The H stands for the Hardness of the pencil while the B stands for its Blackness. An HB pencil is a standard pencil and a variety of letters and numbers are used to designate different types of lead.
Significant seams of graphite exist in parts of China which now produce most of the world’s pencils. Interestingly, the Borrowdale mine in the Lake District remains the only significant source of graphite in its near-pure form in the world. Nowadays the highest grade of graphite at Borrowdale is totally exhausted, although other grades can still be found, and England’s pencil industry continues to thrive in the nearby town of Keswick.
The pencil has turned out to be a remarkably resilient and valuable tool whose use has survived well into our high-tech times, a fact that the story shows. It is sometimes said that the story shows that progress depends upon millions of dollars to invent a pen capable of writing in the zero gravity of space. The astronauts, by contrast, simply equipped their astronauts with good old-fashioned pencils about which there is a popular myth that Americans overlooked the practical advantages of pencils in zero gravity merely fiction. In actual fact, both American and Russian astronauts were equipped with pencils in their respective country’s first space flights. Pencils were chosen for a private company to develop pens capable of writing in zero gravity. In fact, astronauts of every nation now use pens. But no matter - pencils remain in use in every classroom, every planning, building and drawing office, and in every art studio in the world. And there is nothing to suggest that we are about to use anything better than graphite to use in our pencils.`,
    instruction: "Questions 1-13: Choose the correct answer based on the passage or identify if the statement is True/False.",
    questions: [
        { 
            id: 'pq1', 
            question_number: 1, 
            question_text: "Graphite was first found below a _______ blown down in a storm.", 
            correct_answer: "TREE" 
        },
        { 
            id: 'pq2', 
            question_number: 2, 
            question_text: "The first use of graphite was to make marks on _______.", 
            correct_answer: "SHEEP" 
        },
        { 
            id: 'pq3', 
            question_number: 3, 
            question_text: "The characteristics of raw graphite: dirty to use because it is so _______.", 
            correct_answer: "SOFT" 
        },
        { 
            id: 'pq4', 
            question_number: 4, 
            question_text: "Originally wrapped in _______ or animal skin to make it useable as a pencil.", 
            correct_answer: "ROPE" 
        },
        { 
            id: 'pq5', 
            question_number: 5, 
            question_text: "The government completely took over the _______ at Borrowdale.", 
            correct_answer: "MINES" 
        },
        { 
            id: 'pq6', 
            question_number: 6, 
            question_text: "Local people began to _______ graphite for the money involved.", 
            correct_answer: "STEAL" 
        },

        // 2-QISM: TRUE / FALSE / NOT GIVEN
        { 
            id: 'pq7', 
            question_number: 7, 
            question_text: "The Italians were the first to make pencils out of wood.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "TRUE" 
        },
        { 
            id: 'pq8', 
            question_number: 8, 
            question_text: "The Germans used different types of wood to produce pencils.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "NOT GIVEN" 
        },
        { 
            id: 'pq9', 
            question_number: 9, 
            question_text: "More clay in a pencil makes it write more darkly.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "FALSE" 
        },
        { 
            id: 'pq10', 
            question_number: 10, 
            question_text: "After the HB code was introduced, it very quickly became used by all manufacturers.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "NOT GIVEN" 
        },
        { 
            id: 'pq11', 
            question_number: 11, 
            question_text: "English pencil factories have now all closed down.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "FALSE" 
        },
        { 
            id: 'pq12', 
            question_number: 12, 
            question_text: "American astronauts used pencils on their early journeys into space.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "TRUE" 
        },
        { 
            id: 'pq13', 
            question_number: 13, 
            question_text: "The use of graphite pencils is unlikely to continue into the future.", 
            options: ["TRUE", "FALSE", "NOT GIVEN"], 
            correct_answer: "FALSE" 
        }
    ]
},
        {
    "id": "r2",
    "difficulty_level": 2,
    "title": "Corporate Social Responsibility",
    "passage_text": "A) Broadly speaking, proponents of CSR have used four arguments to make their case: moral obligation, sustainability, license to operate, and reputation. The moral appeal — arguing that companies have a duty to be good citizens and to “do the right thing” — is prominent in the goal of Business for Social Responsibility, the leading nonprofit CSR business association in the United States. It asks that its members “achieve commercial success in ways that honor ethical values and respect people, communities, and the natural environment.” Sustainability emphasizes environmental and community stewardship. An excellent definition was developed in the 1980s by Norwegian Prime Minister Gro Harlem Brundtland and used by the World Business Council for Sustainable Development: “Meeting the needs of the present without compromising the ability of future generations to meet their own needs.” The notion of license to operate derives from the fact that every company needs tacit or explicit permission from governments, communities, and numerous other stakeholders to do business. Finally, reputation is used by many companies to justify CSR initiatives on the grounds that they will improve a company’s image, strengthen its brand, enliven morale, and even raise the value of its stock.\n\nB) To advance CSR, we must root it in a broad understanding of the interrelationship between a corporation and society while at the same time anchoring it in the strategies and activities of specific companies. To say broadly that business and society need each other might seem like a cliché, but it is also the basic truth that will pull companies out of the muddle that their current corporate-responsibility thinking has created. Successful corporations need a healthy society. Education, health care, and equal opportunity are essential to a productive workforce. Safe products and working conditions not only attract customers but lower the internal costs of accidents. Efficient utilization of land, water, energy, and other natural resources makes business more productive. Good government, the rule of law, and property rights are essential for efficiency and innovation. Strong regulatory standards protect both consumers and competitive companies from exploitation. Ultimately, a healthy society creates expanding demand for business, as more human needs are met and aspirations grow. Any business that pursues its ends at the expense of the society in which it operates will find its success to be illusory and ultimately temporary. At the same time, a healthy society needs successful companies. No social program can rival the business sector when it comes to creating the jobs, wealth, and innovation that improve standards of living and social conditions over time.\n\nC) A company’s impact on society also changes over time, as social standards evolve and science progresses. Asbestos, now understood as a serious health risk, was thought to be safe in the early 1900s, given the scientific knowledge then available. Evidence of its risks gradually mounted for more than 50 years before any company was held liable for the harms it can cause. Many firms that failed to anticipate the consequences of this evolving body of research have been bankrupted by the results. No longer can companies be content to monitor only the obvious social impacts of today. Without a careful process for identifying evolving social effects of tomorrow, firms may risk their very survival.\n\nD) No business can solve all of society’s problems or bear the cost of doing so. Instead, each company must select issues that intersect with its particular business. Other social agendas are best left to those companies in other industries, NGOs, or government institutions that are better positioned to address them. The essential test that should guide CSR is not whether a cause is worthy but whether it presents an opportunity to create shared value — that is, a meaningful benefit for society that is also valuable to the business. Corporations are not responsible for all the world’s problems, nor do they have the resources to solve them all. Each company can identify the particular set of societal problems that it is best equipped to help resolve and from which it can gain the greatest competitive benefit. Addressing social issues by creating shared value will lead to self-sustaining solutions that do not depend on private or government subsidies. When a well-run business applies its vast resources, expertise, and management talent to problems that it understands and in which it has a stake, it can have a greater impact on social good than any other institution or philanthropic organization.\n\nE) The best corporate citizenship initiatives involve far more than writing a check: they specify clear, measurable goals and track results over time. A good example is GE’s program to adopt underperforming public high schools near several of its major U.S. facilities. The company contributes between $250,000 and $1 million over a five-year period to each school and makes in-kind donations as well. GE managers and employees take an active role by working with school administrators to assess needs and mentor or tutor students. In an independent study of ten schools in the program between 1989 and 1999, nearly all showed significant improvement, while the graduation rate in four of the five worst-performing schools doubled from an average of 30% to 60%. Effective corporate citizenship initiatives such as this one create goodwill and improve relations with local governments and other important constituencies. What’s more, GE’s employees feel great pride in their participation. Their effect is inherently limited, however. No matter how beneficial the program is, it remains incidental to the company’s business, and the direct effect on GE’s recruiting and retention is modest.\n\nF) Microsoft’s Working Connections partnership with the American Association of Community Colleges (AACC) is a good example of a shared-value opportunity arising from investments in context. The shortage of information technology workers is a significant constraint on Microsoft’s growth; currently, there are more than 450,000 unfilled IT positions in the United States alone. Community colleges, with an enrollment of 11.6 million students, representing 45% of all U.S. undergraduates, could be a major solution. Microsoft recognizes, however, that community colleges face special challenges: IT curricula are not standardized, technology used in classrooms is often outdated, and there are no systematic professional development programs to keep faculty up to date. Microsoft’s $50 million five-year initiative was aimed at all three problems. In addition to contributing money and products, Microsoft sent employee volunteers to colleges to assess needs, contribute to curriculum development, and create faculty development institutes. Note that in this case, volunteers and assigned staff were able to use their core professional skills to address a social need, a far cry from typical volunteer programs. Microsoft has achieved results that have benefited many communities while having a direct — and potentially significant — impact on the company.\n\nG) At the heart of any strategy is a unique value proposition: a set of needs a company can meet for its chosen customers that others cannot. The most strategic CSR occurs when a company adds a social dimension to its value proposition, making social impact integral to the overall strategy. Consider Whole Foods Market, whose value proposition is to sell organic, natural and healthy food products to customers who are passionate about food and the environment. The company’s sourcing emphasizes purchases from local farmers through each store’s procurement process. Buyers screen out foods containing any of nearly 100 common ingredients that the company considers unhealthy or environmentally damaging. The same standards apply to products made internally. Whole Foods’ commitment to natural and environmentally friendly operating practices extends well beyond sourcing. Stores are constructed using a minimum of virgin raw materials. Recently, the company purchased renewable wind energy credits equal to 100% of its electricity use in all of its stores and facilities, the only Fortune 500 company to offset its electricity consumption entirely. Spoiled produce and biodegradable waste are trucked to regional centers for composting. Whole Foods’ vehicles are being converted to run on biofuels. Even the cleaning products used in its stores are environmentally friendly. And through its philanthropy, the company has created the Animal Compassion Foundation to develop more natural and humane ways of raising farm animals. In short, nearly every aspect of the company’s value chain reinforces the social dimensions of its value proposition, distinguishing Whole Foods from its competitors.",
    "instruction": "Questions 14–20: Choose the correct heading for paragraphs A–G from the list below. Questions 21–22: Choose NO MORE THAN TWO WORDS from the passage. Questions 23–26: Match each statement with the correct company.",
    "list_of_headings": [
      "i How CSR may help one business to expand",
      "ii CSR in many aspects of a company’s business",
      "iii A CSR initiative without a financial gain",
      "iv Lack of action by the state of social issues",
      "v Drives or pressures motivate companies to address CSR",
      "vi The past illustrates businesses are responsible for future outcomes",
      "vii Companies applying CSR should be selective",
      "viii Reasons that business and society benefit each other"
    ],
    "questions": [
      { "id": "q14", "question_number": 14, "question_text": "Paragraph A", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "v" },
      { "id": "q15", "question_number": 15, "question_text": "Paragraph B", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "viii" },
      { "id": "q16", "question_number": 16, "question_text": "Paragraph C", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "vi" },
      { "id": "q17", "question_number": 17, "question_text": "Paragraph D", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "vii" },
      { "id": "q18", "question_number": 18, "question_text": "Paragraph E", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "iii" },
      { "id": "q19", "question_number": 19, "question_text": "Paragraph F", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "i" },
      { "id": "q20", "question_number": 20, "question_text": "Paragraph G", "options": ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"], "correct_answer": "ii" },
      { "id": "q21", "question_number": 21, "question_text": "Corporations’ workers’ productivity generally needs health care, education, and given ________.", "options": [], "correct_answer": "equal opportunity" },
      { "id": "q22", "question_number": 22, "question_text": "Improvement of the safety standard can reduce the ________ of accidents in the workplace.", "options": [], "correct_answer": "internal costs" },
      { "id": "q23", "question_number": 23, "question_text": "The disposable waste (Which company handles this?)", "options": ["A General Electronics", "B Microsoft", "C Whole Foods Market"], "correct_answer": "C Whole Foods Market" },
      { "id": "q24", "question_number": 24, "question_text": "The way company purchases its goods", "options": ["A General Electronics", "B Microsoft", "C Whole Foods Market"], "correct_answer": "C Whole Foods Market" },
      { "id": "q25", "question_number": 25, "question_text": "Helping the underperforming", "options": ["A General Electronics", "B Microsoft", "C Whole Foods Market"], "correct_answer": "A General Electronics" },
      { "id": "q26", "question_number": 26, "question_text": "Ensuring the people have the latest information", "options": ["A General Electronics", "B Microsoft", "C Whole Foods Market"], "correct_answer": "B Microsoft" }
    ]
  },
       {
  "id": "r3",
  "difficulty_level": 3,
  "title": "The Voynich Manuscript",
  "passage_text": "The starkly modern Beinecke Library at Yale University is home to some of the most valuable books in the world: first folios of Shakespeare, Gutenberg Bibles and manuscripts from the early Middle Ages. Yet the library’s most controversial possession is an unprepossessing vellum manuscript about the size of a hardback book, containing 240-odd pages of drawings and text of unknown age and authorship. Catalogued as MS408, the manuscript would attract little attention were it not for the fact that the drawings hint at esoteric knowledge, while the text seems to be some sort of code — one that no-one has been able to break. It’s known to scholars as the Voynich manuscript, after the American book dealer Wilfrid Voynich, who bought the manuscript from a Jesuit college in Italy in 1912.\n\nOver the years, the manuscript has attracted the attention of everyone from amateur dabblers to top codebreakers, all determined to succeed where countless others have failed. Academic research papers, books and websites are devoted to making sense of the contents of the manuscript, which are freely available to all. “Most other mysteries involve second-hand reports,” says Dr Gordon Rugg of Keele University, a leading Voynich expert. “But this is one that you can see for yourself.”\n\nIt is certainly strange: page after page of drawings of weird plants, astrological symbolism and human figures, accompanied by a script that looks like some form of shorthand. What does it say — and what are the drawings about? Voynich himself believed that the manuscript was the work of the 13th-century English monk Roger Bacon, famed for his knowledge of alchemy, philosophy and science. In 1921 Voynich’s view that Bacon was the writer appeared to win support from the work of William Newbold, Professor of Philosophy at the University of Pennsylvania, who claimed to have found the key to the cipher system used by Bacon. According to Newbold, the manuscript proved that Bacon had access to a microscope centuries before they were supposedly first invented. The claim that this medieval monk had observed living cells created a sensation. It soon became clear, however, that Newbold had fallen victim to wishful thinking. Other scholars showed that his “decoding” methods produced a host of possible interpretations.\n\nThe Voynich manuscript has continued to defy the efforts of world-class experts. In 1944, a team was assembled to tackle the mystery, led by William Friedman, the renowned American codebreaker. They began with the most basic codebreaking task: analysing the relative frequencies of the characters making up the text, looking for signs of an underlying structure. Yet Friedman’s team soon found themselves in deep water. The precise size of the “alphabet” of the Voynich manuscript was unclear: it’s possible to make out more than 70 distinct symbols among the 170,000-character text. Furthermore, Friedman discovered that some words and phrases appeared more often than expected in a standard language, casting doubt on claims that the manuscript concealed a real language, as encryption typically reduces word frequencies.\n\nFriedman concluded that the most plausible resolution of this paradox was that “Voynichese” is some sort of specially created artificial language, whose words are devised from concepts, rather than linguistics. So could the Voynich manuscript be the earliest-known example of artificial language? “Friedman’s hypothesis commands respect because of the lifetime of cryptanalytical expertise he brought to bear,” says Rob Churchill, co-author of The Voynich Manuscript. That still leaves a host of questions unanswered, however, such as the identity of the author and the meaning of the bizarre drawings. “It does little to advance our understanding of the manuscript as a whole,” says Churchill.\n\nEven though Friedman was working more than 60 years ago, he suspected that major insights would come from using the device that had already transformed codebreaking: the computer. In this he was right — it is now the key tool for uncovering clues about the manuscript’s language.\n\nThe insights so far have been perplexing. For example, in 2001 another leading Voynich scholar, Dr Gabriel Landini of Birmingham University in the UK, published the results of his study of the manuscript using a pattern-detecting method called spectral analysis. This revealed evidence that the manuscript contains genuine words, rather than random nonsense, consistent with the existence of some underlying natural language. Yet the following year, Voynich expert René Zandbergen of the European Space Agency in Darmstadt, Germany showed that the entropy of the text (a measure of the rate of transfer of information) was consistent with Friedman’s suspicions that an artificial language had been used.\n\nMany are convinced that the Voynich manuscript isn’t a hoax. For how could a medieval hoaxer create so many telltale signs of a message from random nonsense? Yet even this has been challenged in new research by Rugg. Using a system, first published by the Italian mathematician Girolamo Cardano in 1550, in which a specially constructed grille is used to pick out symbols from a table, Rugg found he could rapidly generate text with many of the basic traits of the Voynich manuscript. Publishing his results in 2004, Rugg stresses that he hadn’t set out to prove the manuscript a hoax. “I simply demonstrated that it’s feasible to hoax something this complex in a few months,” he says.\n\nInevitably, others beg to differ. Some scholars, such as Zandbergen, still suspect the text has genuine meaning, though believe it may never be decipherable. Others, such as Churchill, have suggested that the sheer weirdness of the illustrations and text hint at an author who had lost touch with reality.\n\nWhat is clear is that the book-sized manuscript kept under lock and key at Yale University has lost none of its fascination. “Many derive great intellectual pleasure from solving puzzles,” says Rugg. “The Voynich manuscript is as challenging a puzzle as anyone could ask for.”",
  "instruction": "Questions 27–40: Read the text and answer the questions following the specific instructions for each set.",
  "list_of_headings": [
    "A Gordon Rugg",
    "B Roger Bacon",
    "C William Newbold",
    "D William Friedman",
    "E Rob Churchill",
    "F Gabriel Landini",
    "G René Zandbergen",
    "H Girolamo Cardano"
  ],
  "questions": [
    { "id": "q27", "question_number": 27, "question_text": "It is uncertain when the Voynich manuscript was written.", "options": ["TRUE", "FALSE", "NOT GIVEN"], "correct_answer": "TRUE" },
    { "id": "q28", "question_number": 28, "question_text": "Wilfrid Voynich donated the manuscript to the Beinecke Library.", "options": ["TRUE", "FALSE", "NOT GIVEN"], "correct_answer": "FALSE" },
    { "id": "q29", "question_number": 29, "question_text": "Interest in the Voynich manuscript extends beyond that of academics and professional codebreakers.", "options": ["TRUE", "FALSE", "NOT GIVEN"], "correct_answer": "TRUE" },
    { "id": "q30", "question_number": 30, "question_text": "The text of the Voynich manuscript contains just under 70 symbols.", "options": ["TRUE", "FALSE", "NOT GIVEN"], "correct_answer": "FALSE" },
    { "id": "q31", "question_number": 31, "question_text": "The number of times that some words occur makes it unlikely that the manuscript is based on an authentic language.", "options": ["A", "B", "C", "D", "E", "F", "G", "H"], "correct_answer": "D" },
    { "id": "q32", "question_number": 32, "question_text": "Unlike some other similar objects of fascination, people can gain direct access to the Voynich manuscript.", "options": ["A", "B", "C", "D", "E", "F", "G", "H"], "correct_answer": "A" },
    { "id": "q33", "question_number": 33, "question_text": "The person who wrote the manuscript may not have been entirely sane.", "options": ["A", "B", "C", "D", "E", "F", "G", "H"], "correct_answer": "E" },
    { "id": "q34", "question_number": 34, "question_text": "It is likely that the author of the manuscript is the same person as suggested by Wilfrid Voynich.", "options": ["A", "B", "C", "D", "E", "F", "G", "H"], "correct_answer": "C" },
    { "id": "q35", "question_number": 35, "question_text": "William Newbold believed that the author of the Voynich manuscript had been able to look at cells through a:", "options": [], "correct_answer": "microscope" },
    { "id": "q36", "question_number": 36, "question_text": "William Friedman concluded that the manuscript was written in an artificial language that was based on:", "options": [], "correct_answer": "concepts" },
    { "id": "q37", "question_number": 37, "question_text": "He couldn’t find out the meaning of this language but he believed that the ________ would continue to bring advances in codebreaking.", "options": [], "correct_answer": "computer" },
    { "id": "q38", "question_number": 38, "question_text": "Dr Gabriel Landini used a system known as ________ in his research.", "options": [], "correct_answer": "spectral analysis" },
    { "id": "q39", "question_number": 39, "question_text": "Dr Gordon Rugg’s system involved a grille that made it possible to quickly select symbols that appeared in a:", "options": [], "correct_answer": "table" },
    { "id": "q40", "question_number": 40, "question_text": "The writer’s main aim in this passage is to:", "options": ["A explain the meaning", "B determine the true identity", "C describe the numerous attempts to decode", "D identify media coverage"], "correct_answer": "C" }
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
        "What do you like about your home town?",
      ]
    },
    {
      id: "s2",
      part: 2,
      title: "Part 2: Beautiful Place",
      question: "Describe a beautiful place you have visited."
    },
     {
      id: "s3",
      part: 3,
      title: "Part 3: Tourism & Environment",
     question: "Do you think tourism always benefits the environment?",
        
    }
  ]
};
