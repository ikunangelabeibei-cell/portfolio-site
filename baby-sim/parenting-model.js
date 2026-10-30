// Educational content informed by research/parenting-development-review.md.
// These are authored examples, not MAPS questionnaire items or validated outcome scores.
export const SOURCES = [
  {title:'MAPS: Parent & Forehand (2017)',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5646703/'},
  {title:'Erikson’s stages: APA Dictionary',url:'https://dictionary.apa.org/eriksons-eight-stages-of-psychosocial-development'},
  {title:'Infant responsiveness: Klein Velderman et al. (2006)',url:'https://pubmed.ncbi.nlm.nih.gov/16756402/'},
  {title:'Autonomy support: Bindman et al. (2015)',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4562792/'},
  {title:'Effort and persistence: Gunderson et al. (2013)',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3655123/'},
  {title:'Adolescent autonomy: Teuber et al. (2022)',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9135772/'},
  {title:'Identity: Beyers & Goossens (2008)',url:'https://pubmed.ncbi.nlm.nih.gov/17629552/'},
];
export const STAGES = {
  infant:{label:'Infancy · 0–1 year',lens:'trust',note:'Trust vs. mistrust · hope. Notice cues and offer dependable comfort.'},
  toddler:{label:'Early childhood · 1–3 years',lens:'autonomy',note:'Autonomy vs. shame/doubt · will. Support small choices and independent attempts.'},
  preschool:{label:'Play age · 3–6 years',lens:'initiative',note:'Initiative vs. guilt · purpose. Make room for ideas, play, and manageable goals.'},
  school:{label:'School age · 7–11 years',lens:'industry',note:'Industry vs. inferiority · competence. Make room for effort, learning, and cooperation.'},
  teen:{label:'Adolescence · 12–18 years',lens:'identity',note:'Identity vs. confusion · fidelity. Listen to interests, values, and a growing independent voice.'},
};
const factor=(id,name,domain,focus)=>({id,name,domain,focus});
export const LENSES = {
 trust:{title:'Trust vs. mistrust',virtue:'Hope',source:2,factors:[
  factor('safety','Felt safety','Trust','Feeling safe enough to seek comfort.'),
  factor('cues','Cue responsiveness','Sensitive caregiving','Having distress signals noticed.'),
  factor('comfort','Comfort with support','Co-regulation','Receiving soothing support rather than being expected to self-manage.'),
  factor('predictability','Predictable care','Dependability','Experiencing a calm, understandable response.'),
  factor('connection','Connection','Warmth','Maintaining contact during distress.'),
  factor('exploration','Safe exploration','Secure base','Exploring with an available caregiver.'),
  factor('trust','Relational trust','Hope','Experiencing the caregiver as available.') ]},
 autonomy:{title:'Autonomy vs. shame/doubt',virtue:'Will',source:3,factors:[
  factor('choice','Supported choice','Autonomy','Making a small, manageable choice.'),
  factor('independence','Trying independently','Will','Doing a safe part of the task with support.'),
  factor('confidence','Confidence after mistakes','Shame and doubt','Separating an accident from being a bad person.'),
  factor('emotion','Emotion support','Co-regulation','Receiving help with a strong feeling.'),
  factor('boundaries','Understandable boundaries','Structure','Knowing which limit still applies.'),
  factor('help','Asking for help','Connection','Seeking guidance without humiliation.'),
  factor('trust','Relational trust','Relationship','Expecting respectful support.') ]},
 initiative:{title:'Initiative vs. guilt',virtue:'Purpose',source:3,factors:[
  factor('initiative','Starting an idea','Initiative','Offering an idea and being allowed to try it.'),
  factor('curiosity','Curiosity and exploration','Purpose','Staying curious after a setback.'),
  factor('goals','Manageable goals','Planning','Finding a next step small enough to attempt.'),
  factor('confidence','Confidence after mistakes','Guilt','Taking responsibility without being shamed.'),
  factor('cooperation','Collaborative play','Social participation','Making space for another person’s needs.'),
  factor('emotion','Emotion support','Regulation','Naming and working through frustration.'),
  factor('help','Asking for help','Relationship','Seeking help while keeping ownership of the task.') ]},
 industry:{title:'Industry vs. inferiority',virtue:'Competence',source:4,factors:[
  factor('competence','Sense of competence','Industry','Seeing a learnable task rather than a verdict on ability.'),
  factor('effort','Effort and persistence','Practice','Returning to a challenge with support.'),
  factor('strategy','Strategy use','Problem-solving','Trying a specific way to improve.'),
  factor('mistakes','Learning from mistakes','Inferiority','Treating errors as useful information.'),
  factor('cooperation','Cooperation','Shared responsibility','Contributing to a fair shared plan.'),
  factor('help','Asking for help','Learning support','Knowing that help-seeking belongs in learning.'),
  factor('belonging','Belonging','Acceptance','Feeling valued beyond performance.') ]},
 identity:{title:'Identity vs. confusion',virtue:'Fidelity',source:6,factors:[
  factor('interests','Exploring interests','Identity exploration','Considering an interest without having it imposed or dismissed.'),
  factor('values','Expressing values','Self-definition','Explaining what matters personally.'),
  factor('decisions','Independent decisions','Agency','Taking part in an age-appropriate decision.'),
  factor('voice','Being heard','Supportiveness','Having a perspective considered respectfully.'),
  factor('belonging','Belonging without conformity','Acceptance','Remaining connected while disagreeing.'),
  factor('boundaries','Negotiated boundaries','Responsibility','Understanding and contributing to a safety or household agreement.'),
  factor('trust','Relational trust','Relationship','Being able to disclose difficulties without intimidation.') ]},
};
export const STYLES = [
 {id:'level1',level:1,name:'Supportive and structured',fullName:'Supportive and Structured Parenting',zh:'高支持型',color:'#58a982',features:['Warmth','Supportiveness','Proactive parenting','Positive reinforcement'],why:'You acknowledge the feeling, keep a clear limit, and offer a next step. This illustrates the supportive and structured pattern in the workbook.',repair:'Keep the limit steady and leave room for a small choice.'},
 {id:'level2',level:2,name:'Generally adaptive',fullName:'Generally Adaptive Parenting',zh:'基本稳定型',color:'#88a58a',features:['Warmth','Supportiveness','Less explicit planning'],why:'The response is generally kind and workable, but gives less explanation or guidance. It illustrates the workbook’s generally adaptive pattern.',repair:'Add one reason and a specific next step, then follow through calmly.'},
 {id:'level3',level:3,name:'Inconsistent',fullName:'Inconsistent Parenting',zh:'不一致/摇摆型',color:'#c79a49',features:['Lax control','Changing a stated limit'],why:'A stated limit changes under pressure. The immediate conflict may ease, while the next boundary becomes harder to predict. This illustrates inconsistency, not a diagnosis of your usual parenting.',repair:'Acknowledge that the plan changed, then explain one realistic limit you can maintain.'},
 {id:'level4',level:4,name:'Hostile or coercive',fullName:'Hostile or Coercive Parenting',zh:'高冲突/高控制型',color:'#d5748a',features:['Hostility','Blame or coercive pressure'],why:'Blame or pressure becomes the main way to gain compliance. A quiet response can reflect tension rather than understanding. This illustrates the hostile or coercive pattern.',repair:'Pause, lower your voice, and replace blame with a clear, nonviolent request.'},
 {id:'level5',level:5,name:'High-risk harmful',fullName:'High-Risk Harmful Parenting',zh:'高风险伤害型',color:'#b45972',features:['Threatened physical control','Severe intimidation'],why:'Threatening physical punishment makes safety the immediate concern. This is a harmful exemplar from the workbook, not an acceptable discipline strategy.',repair:'Stop the threat. Keep everyone physically safe, step back if needed, and return with a calm, nonviolent limit.'},
];
const turn=(speech,choices,focus)=>({speech,choices,focus});
const variant=(name,setting,intro,turns)=>({name,setting,intro,turns});
export const SCENARIOS=[
 {id:'tower',icon:'🧱',variants:{
 early:variant('The fallen tower','Playroom','A block slips. The tower scatters across the rug. Mia looks up at you.',[
 turn('Uh-oh… my tower fell down. Can you help me?', ['“Oops! Let’s build it again together. You choose the first block.”','“It’s okay. Try again. I’m here.”','“I said we’d finish this first, but never mind. You can have a new toy.”','“Stop making a mess! You never listen.”','“Make another mess and I’ll hit you.”'],['confidence','initiative','curiosity','help','choice','independence','emotion']),
 turn('What if it falls again? Can you stay?', ['“I’ll stay. You place one block and I’ll steady the bottom.”','“Sure. Take your time.”','“I said you could try, but I’ll do it all now so you won’t get upset.”','“Stop whining and do it properly.”','“If you keep crying, I’ll smack you.”'],['goals','help','independence','emotion','trust']),
 turn('This one stayed! Can I try a different way?', ['“You found a steady spot. Tell me your idea and let’s try it.”','“Yes. Good effort.”','“I said to leave it here, but put it anywhere if that keeps you happy.”','“No. Do it my way. Your ideas just make a mess.”','“Do it my way or I’ll slap your hand.”'],['initiative','curiosity','confidence','choice','boundaries'])]),
 school:variant('The project falls apart','Kitchen table','A model for school breaks just before the final piece goes on.',[
 turn('My model broke. I worked on it all afternoon.', ['“That’s disappointing after so much work. Which part should we inspect first?”','“That’s frustrating. We can fix it.”','“I said you should finish it yourself, but I’ll do the whole project now.”','“You should have done it properly. Look at this mess.”','“If you don’t finish it now, I’ll hit you.”'],['competence','effort','mistakes','help']),
 turn('I think the base is too narrow. What if I’m wrong?', ['“That’s a useful guess. How could we test a wider base?”','“Try it. It might work.”','“I said we’d test your idea, but forget that. I’ll pick the easiest answer.”','“Stop guessing. Just follow my instructions.”','“Question me again and I’ll slap you.”'],['strategy','competence','effort','help']),
 turn('It stands now. Can I tell my teacher I needed help?', ['“Yes. You did the testing, and asking for help is part of learning.”','“Yes. You worked hard.”','“I said you should explain it, but just say you did everything alone.”','“No. Needing help makes you look incapable.”','“Tell anyone I helped and I’ll hit you.”'],['help','mistakes','belonging','competence'])]),
 teen:variant('A project setback','Study space','An application project fails during a test. Mia closes the laptop.',[
 turn('It failed again. Maybe this just isn’t for me.', ['“This matters to you. Do you want me to listen or help think through the next test?”','“That’s rough. I’m here if you need me.”','“I said we’d keep the deadline, but forget the application if you’re upset.”','“You’re wasting your time. Choose the career I told you to choose.”','“Keep arguing about this and I’ll hit you.”'],['interests','decisions','voice','trust']),
 turn('I still want to try, but I don’t want you to take over.', ['“It’s your project. What support would leave you in charge?”','“Okay. Tell me if you need help.”','“I said you could lead, but I’ll make every decision until you stop worrying.”','“You don’t get a say. I know better.”','“Refuse my plan and I’ll slap you.”'],['decisions','voice','values','trust']),
 turn('Can we talk about a different course if this doesn’t work?', ['“Yes. Let’s explore what fits your interests and what each option requires.”','“Sure. We can talk.”','“I said we’d compare options, but pick anything now so we can stop discussing it.”','“There’s nothing to discuss. Your future is my decision.”','“Choose against me and I’ll hit you.”'],['interests','values','decisions','belonging'])])}},
 {id:'milk',icon:'🥛',variants:{
 infant:variant('A cup tips over','Breakfast','A cup tips onto the tray. Mia startles and begins to fuss.',[
 turn('Mia stiffens, fusses, and reaches toward you.', ['“I’m here.” Move the cup away and offer a calm, gentle touch.','“Oops. You’re okay.” Stay nearby and wipe the tray.','You start to comfort Mia, then pull away and return unpredictably as the fussing changes.','“Stop that noise!” Scold Mia for the spill.','“Be quiet or I’ll smack you.” Threaten physical punishment.'],['safety','cues','comfort','connection']),
 turn('Mia watches your hands and fusses again.', ['Slow down, notice the reaching, and pause the wiping to offer comfort.','Stay close and speak softly while you finish wiping.','Start soothing, then abruptly stop and restart whenever the crying changes.','“I said stop crying!” Raise your voice.','Threaten to hit Mia if the fussing continues.'],['cues','comfort','predictability','trust']),
 turn('Mia loosens their hands and looks toward the cup.', ['Support the cup safely and wait for a reaching or turning-away cue.','Offer the cup gently and stay nearby.','Offer the cup, withdraw it suddenly, then offer it again when Mia cries.','“You’ve caused enough trouble.” Ignore the reaching.','Threaten to slap Mia’s hand for reaching.'],['exploration','cues','trust','safety'])]),
 early:variant('Spilled milk','Breakfast','The cup tips. Milk spreads across the table. Mia freezes.',[
 turn('I spilled it… are you mad?', ['“It was an accident. Let’s get a cloth. You can wipe this little patch.”','“It’s okay. We’ll clean it up.”','“I said we both help clean, but you can skip it if you’re upset.”','“Look what you did! You’re so careless.”','“Spill it again and I’ll hit you.”'],['confidence','help','goals','emotion','independence']),
 turn('The cloth is all wet. I can’t do it.', ['“Use this dry corner. I’ll show one wipe, then you can try.”','“Here’s a dry cloth. Have another go.”','“I said you could try, but I’ll do it all now. Never mind the plan.”','“You can’t even wipe a table properly!”','“Stop complaining or I’ll smack you.”'],['goals','confidence','help','independence']),
 turn('Can I pour some more?', ['“Yes. Let’s use a little jug. Hold the cup and pour slowly with me.”','“Yes. I’ll stay nearby.”','“I said just a little, but pour as much as you like so you won’t cry.”','“No. You’ll just ruin everything again.”','“Touch that cup and I’ll slap your hand.”'],['initiative','curiosity','choice','boundaries','confidence'])]),
 school:variant('A kitchen accident','Kitchen','A jug slips while Mia helps prepare lunch.',[
 turn('I spilled it. I was trying to help.', ['“Thanks for helping. Accidents happen. What will keep the floor safe while we clean?”','“It’s okay. Let’s wipe it up.”','“I said everyone helps clean, but I’ll excuse you if you complain.”','“You’re useless in the kitchen. Get out.”','“Make another mess and I’ll hit you.”'],['competence','mistakes','cooperation','belonging']),
 turn('Should I get a towel or move the cups first?', ['“Good question. Let’s move the cups out of the way, then dry the spill.”','“Get a towel first.”','“I said move the cups first, but do anything so we can stop discussing it.”','“Why do I have to think for you?”','“Ask again and I’ll slap you.”'],['strategy','help','cooperation']),
 turn('Can I try pouring again with a smaller jug?', ['“That sounds like a useful adjustment. Try a small amount and check your grip.”','“Sure. Take it slowly.”','“I said use the small jug, but take the big one if you insist.”','“No. You’ve proved you can’t do it.”','“Try again and I’ll hit you.”'],['effort','strategy','competence','mistakes'])]),
 teen:variant('A mistake at home','Kitchen','A drink spills while Mia prepares food for friends.',[
 turn('I’ll clean it. Please don’t make a big deal in front of everyone.', ['“Okay. Let’s keep the floor safe. Do you need anything before I step back?”','“Okay. There’s a towel here.”','“I said spills need cleaning, but leave it if you’re annoyed.”','“Your friends should see how irresponsible you are.”','“Talk to me like that again and I’ll hit you.”'],['voice','decisions','belonging','boundaries']),
 turn('I want to handle it myself, but I need another towel.', ['“Here it is. Thanks for telling me what you need.”','“Sure. Here you go.”','“I said you could handle it, but now I’m taking over so this ends faster.”','“If you were capable, you wouldn’t need help.”','“Ask for anything else and I’ll slap you.”'],['decisions','voice','trust']),
 turn('Can we agree how to handle accidents without calling me careless?', ['“Yes. We can expect cleanup without labeling you. What would a fair agreement sound like?”','“Yes. I’ll try to be more careful with my words.”','“I said we’d make an agreement, but let’s drop every rule if you’re upset.”','“You don’t get to tell me how to speak.”','“Challenge my rules again and I’ll hit you.”'],['values','voice','boundaries','trust'])])}},
 {id:'bed',icon:'🌙',variants:{
 infant:variant('A quiet room','Bedroom','The lights dim. Mia fusses as you move toward the doorway.',[
 turn('Mia cries and turns toward your voice.', ['“I’m here.” Check comfort needs and offer a quiet, familiar soothing routine.','Stay close and speak softly while offering comfort.','Begin soothing, then repeatedly change the routine with each cry.','“Stop crying. You’re being difficult.”','Threaten to hit Mia if the crying continues.'],['safety','comfort','cues','connection']),
 turn('Mia reaches as you shift away.', ['Pause and notice the reaching. Offer calm contact and respond to the cue.','Return nearby and offer a gentle voice.','Move away, rush back, and change what happens next without a steady pattern.','“Don’t start again!” Shout from the doorway.','Threaten to smack Mia for fussing.'],['predictability','cues','trust','comfort']),
 turn('Mia’s hands relax, then they stir again.', ['Keep the soothing response calm and familiar, and watch for changing cues.','Stay nearby and continue comforting gently.','Switch between soothing and abrupt withdrawal as the fussing rises and falls.','“You’ve had enough attention.” Reject the cue angrily.','Threaten physical punishment for waking again.'],['trust','predictability','connection','safety'])]),
 early:variant('One more story','Bedroom','The story ends. Mia holds the book against their chest.',[
 turn('I’m not tired! Can you stay?', ['“You want more time. One cuddle, then lights down. Choose the bear or the rabbit.”','“I’ll stay for a cuddle. Then it’s bedtime.”','“I said bedtime now, but you can stay up if you keep asking.”','“Stop arguing and go to sleep!”','“Get out of bed and I’ll hit you.”'],['emotion','goals','choice','boundaries','help']),
 turn('I feel lonely when you go.', ['“I hear you. Let’s choose a comfort toy. I’ll come back for a quiet check-in.”','“I’m nearby. Hold your bear.”','“I said I’d check in, but I might come back only if you cry loudly.”','“That’s ridiculous. Stop being a baby.”','“Cry again and I’ll smack you.”'],['emotion','confidence','trust','help']),
 turn('Can we do this again tomorrow?', ['“Yes. Story, cuddle, and a check-in. Which story should we save for tomorrow?”','“Yes. We can have another story tomorrow.”','“I said the same routine, but tomorrow you can decide whether bedtime happens.”','“Only if you stop being so annoying.”','“Ask again and I’ll slap you.”'],['goals','initiative','choice','boundaries','emotion'])]),
 school:variant('Tomorrow feels difficult','Bedroom','Mia packs a school bag slowly and glances at the clock.',[
 turn('I can’t sleep. I’m worried about tomorrow’s presentation.', ['“Let’s name the hardest part. We can practice one sentence, then wind down.”','“That sounds stressful. I’m here.”','“I said we’d keep the bedtime routine, but stay up all night if you’re worried.”','“You should have prepared earlier. This is your fault.”','“Keep complaining and I’ll hit you.”'],['competence','effort','help','belonging']),
 turn('What if I forget everything in front of the class?', ['“Let’s make a cue card and practice using it. Forgetting a line doesn’t erase your work.”','“You can look at your notes.”','“I said you should present, but I’ll tell school you never have to try.”','“Then everyone will see you didn’t work hard enough.”','“Embarrass me tomorrow and I’ll slap you.”'],['strategy','mistakes','competence','help']),
 turn('Can you listen to the first bit once more?', ['“Yes, once more. I’ll notice what worked, then we’ll keep our rest plan.”','“Sure. Let’s hear it.”','“I said once more, but practice as long as you want, even if neither of us sleeps.”','“No. You’re wasting my time.”','“Ask again and I’ll hit you.”'],['effort','help','belonging','strategy'])]),
 teen:variant('A late-night disagreement','Bedroom','A message lights up Mia’s phone after your agreed wind-down time.',[
 turn('My friends are still talking. Why do I have to put my phone away?', ['“Staying connected matters. So does rest. What plan keeps both in view?”','“I get it. Please finish this conversation and wind down.”','“I said phones away, but keep it all night if you argue.”','“Because I said so. Your opinion doesn’t matter.”','“Hand it over or I’ll hit you.”'],['voice','values','decisions','boundaries']),
 turn('It feels like you don’t trust me to manage anything.', ['“I want you to practice managing it. Let’s agree on a plan and a time to review it.”','“I do trust you. Let’s talk tomorrow.”','“I said we’d agree on a plan, but there are no limits now if you’re upset.”','“You haven’t earned the right to be trusted.”','“Question me again and I’ll slap you.”'],['decisions','trust','voice','boundaries']),
 turn('Can I suggest a different cutoff for weekends?', ['“Yes. Explain your idea and how it protects sleep. We’ll consider it together.”','“Yes. We can discuss that.”','“I said we’d discuss it, but change it whenever you want so this ends.”','“No. I make the rules and you obey.”','“Try changing my rule and I’ll hit you.”'],['values','decisions','boundaries','belonging'])])}},
 {id:'share',icon:'🧸',variants:{
 early:variant('A favorite toy','Playdate','A friend reaches for the toy Mia is holding.',[
 turn('That’s mine! I’m still using it!', ['“You’re still playing. Tell Sam you’ll offer a turn when this part is done.”','“Finish this bit, then offer Sam a turn.”','“I said we take turns, but keep it forever if sharing upsets you.”','“Don’t be selfish. Give it here now.”','“Hold onto it and I’ll slap your hand.”'],['cooperation','initiative','emotion','boundaries','choice']),
 turn('Sam grabbed it! I want it back!', ['“I won’t let anyone grab. Let’s ask for it back and make a turn plan.”','“Use your words. I’ll stay here.”','“I said no grabbing, but grab it back this time so you stop crying.”','“Stop crying. Nobody wants to play with you.”','“Cry again and I’ll smack you.”'],['cooperation','emotion','help','confidence','boundaries']),
 turn('What can I do while I wait?', ['“Choose another toy or help set a timer. Your turn will come.”','“Try this toy while you wait.”','“I said wait for your turn, but take it now if you keep asking.”','“Sit down and stop bothering everyone.”','“Ask again and I’ll hit you.”'],['curiosity','goals','choice','boundaries','cooperation'])]),
 school:variant('Working as a team','Kitchen table','Two classmates want different parts of a shared model.',[
 turn('Sam picked the fun part. I’m stuck doing everything else.', ['“That sounds uneven. What division of tasks would feel fair to both of you?”','“Let’s talk to Sam and split the work.”','“I said divide it fairly, but just stop working if you’re upset.”','“Stop complaining. Nobody likes a difficult teammate.”','“Argue about it again and I’ll hit you.”'],['cooperation','competence','belonging','help']),
 turn('I don’t know how to explain it without sounding mean.', ['“Try naming the task, not blaming Sam: ‘Can we swap one part?’”','“Ask calmly. I’ll listen.”','“I said use words, but just take Sam’s part if it’s easier.”','“You should already know how to talk to people.”','“Get it wrong and I’ll slap you.”'],['strategy','help','cooperation','mistakes']),
 turn('We made a new plan. Can you check if we forgot anything?', ['“Yes. You made the plan together. Let’s compare it with the task list.”','“Sure. Show me the plan.”','“I said follow the list, but skip anything you don’t like.”','“Finally. I shouldn’t have had to help.”','“Need help again and I’ll hit you.”'],['cooperation','strategy','competence','help'])]),
 teen:variant('A privacy boundary','Living room','Mia’s sibling asks to borrow a jacket without asking first.',[
 turn('I don’t want them borrowing my things without asking.', ['“That’s a reasonable boundary. How can we make asking first clear for everyone?”','“Okay. I’ll remind them to ask.”','“I said everyone must ask, but let them take it whenever they complain.”','“You’re selfish. Your things aren’t really yours.”','“Refuse to share and I’ll hit you.”'],['voice','boundaries','decisions','belonging']),
 turn('I’m okay lending it sometimes. I just want a choice.', ['“Let’s make room for yes and no. What borrowing agreement would you propose?”','“That makes sense. Ask them to check with you.”','“I said you have a choice, but today you must say yes so they stop complaining.”','“You don’t get choices in this house.”','“Say no again and I’ll slap you.”'],['values','decisions','boundaries','trust']),
 turn('Can we include returning it clean and on time?', ['“Yes. Put those expectations in the agreement and hear their side too.”','“Yes. That sounds fair.”','“I said return it on time, but ignore that whenever it causes an argument.”','“Stop making everything complicated.”','“Keep talking about your rules and I’ll hit you.”'],['values','voice','boundaries','trust'])])}},
 {id:'store',icon:'🛒',variants:{
 infant:variant('Too much noise','Grocery store','A cart rattles past. Mia turns away from the bright aisle.',[
 turn('Mia startles and begins to cry.', ['“I’m here.” Check the cue and pause in a quieter spot.','Speak softly and stay close while you pause.','Pause briefly, then repeatedly return to the noise and retreat whenever Mia cries.','“Stop making a scene!” Scold Mia.','Threaten to hit Mia for crying.'],['safety','cues','comfort','connection']),
 turn('Mia turns away again and clenches their hands.', ['Notice the turning-away cue, reduce stimulation, and offer gentle comfort.','Stop the cart and offer a calm voice.','Start comforting, then abruptly continue shopping and repeat without a steady response.','“Enough! Be quiet.” Raise your voice.','Threaten to smack Mia if the crying continues.'],['cues','comfort','predictability','trust']),
 turn('Mia relaxes slightly and looks toward you.', ['Keep contact calm and finish the outing in a way that stays responsive to the cues.','Stay nearby and keep the rest of the trip short.','Return to the loud aisle, then change the plan again with every fuss.','“Finally. Don’t start again.” Respond angrily.','Threaten punishment for crying again.'],['trust','connection','safety','predictability'])]),
 early:variant('Not on the list','Grocery store','Mia spots a bright packet on the shelf and reaches for it.',[
 turn('I want it now! Please!', ['“You really want it. It isn’t on our list. Help me choose apples or pears.”','“Not today. Come help me find the fruit.”','“I said no snacks, but take it if you stop crying.”','“Stop embarrassing me! Everyone is looking.”','“Keep crying and I’ll hit you.”'],['emotion','goals','choice','boundaries','confidence']),
 turn('But I wanted that one!', ['“I hear you. The answer stays no. We can pause somewhere quiet together.”','“I know. Let’s take a little break.”','“I said one packet, but take another if you’re still upset.”','“I don’t care what you want. Be quiet.”','“Ask again and I’ll smack you.”'],['emotion','help','boundaries','trust']),
 turn('Can I help put the apples in the bag?', ['“Yes. Hold the bag while I pass one apple. We’ll finish together.”','“Yes. Thanks for helping.”','“I said just apples, but add any snacks you want so we avoid another argument.”','“Only if you stop being difficult.”','“Get in my way and I’ll hit you.”'],['initiative','goals','cooperation','independence','confidence'])]),
 school:variant('A shopping budget','Grocery store','Mia compares a snack’s price with the amount left on your list.',[
 turn('Can we buy this too? I think there’s enough money.', ['“Let’s check the total together. What would we need to trade off?”','“Maybe. Let’s look at the price.”','“I said keep the budget, but buy anything if you keep asking.”','“You don’t understand anything about money. Stop asking.”','“Argue about money again and I’ll hit you.”'],['strategy','competence','cooperation','help']),
 turn('I forgot the price of the bread. My total was wrong.', ['“That’s useful to notice. Add the bread and check the sum again.”','“That’s okay. Recalculate it.”','“I said check the total, but forget the budget so you won’t be disappointed.”','“You can’t even add properly.”','“Make another mistake and I’ll slap you.”'],['mistakes','strategy','effort','competence']),
 turn('We could choose the smaller pack and stay in budget.', ['“You found a trade-off. Let’s check that it leaves enough for the rest.”','“Good idea. Let’s do that.”','“I said choose the smaller one, but take both if you’re not happy.”','“Just buy what I say. Your ideas aren’t useful.”','“Choose differently and I’ll hit you.”'],['competence','strategy','cooperation','belonging'])]),
 teen:variant('A spending disagreement','Grocery store','Mia holds an item chosen for a gathering with friends.',[
 turn('This costs more, but it matters to me. Can we talk about it?', ['“Tell me what matters about it. Then let’s work within what we can spend.”','“Sure. Explain it to me.”','“I said we have a budget, but take anything if you’re upset.”','“Your priorities are stupid. Put it back.”','“Argue with me and I’ll hit you.”'],['values','voice','decisions','boundaries']),
 turn('I could pay the difference with my own money.', ['“Let’s check the cost and what you’d give up. It can be your decision within our agreement.”','“That could work. Check how much you have.”','“I said you would pay the difference, but I’ll cover everything if you complain.”','“You’re not capable of deciding how to use money.”','“Disagree again and I’ll slap you.”'],['decisions','values','boundaries','trust']),
 turn('Can you disagree with my choice without making fun of it?', ['“Yes. I can discuss costs without mocking what matters to you. Let’s reset.”','“Yes. I’ll be more thoughtful.”','“I said we’d talk respectfully, but I’ll agree with anything to avoid conflict.”','“If you don’t like my comments, stop having such ridiculous tastes.”','“Challenge me again and I’ll hit you.”'],['voice','values','belonging','trust'])])}},
];
const toddlerSpeech = {
    tower:['Uh-oh… it fell! Help me?','You stay? I try?','Look! Can I try this?'],
    milk:['Oops… milk! You mad?','Wet! Help me?','Me pour?'],
    bed:['One more! Stay?','Don’t go…','Story tomorrow?'],
    share:['Mine! My turn!','Give back! Help me!','What can I do?'],
    store:['Want that! Please!','But I want it…','Me help?'],
  };
const toddlerSupport = {
    tower:['“Oops. Let’s try again. You pick a block.”','“I’ll stay. You put one block here.”','“You did it. Which block next?”'],
    milk:['“Oops. Here’s a cloth. Let’s wipe together.”','“This corner is dry. Try one wipe with me.”','“Yes. Little jug. We pour slowly together.”'],
    bed:['“One cuddle, then rest. Bear or rabbit?”','“I’m nearby. Hold bear. I’ll check in.”','“Yes. Story, cuddle, then rest.”'],
    share:['“Your turn now. Sam’s turn after.”','“No grabbing. Let’s ask for it back.”','“Wait with this toy. Your turn is coming.”'],
    store:['“You want it. Not today. Apples or pears?”','“You’re upset. I’m here. Still no snack.”','“Yes. Hold the bag. I’ll pass an apple.”'],
  };
// Shared settings become separate stage variants with their own prompts and factors.
for (const scenario of SCENARIOS) {
 const base = scenario.variants.early;
 if (!base) continue;
 for (const [stage,lens] of [['toddler','autonomy'],['preschool','initiative']]) {
  const ids = new Set(LENSES[lens].factors.map(f=>f.id));
  scenario.variants[stage] = {...base,turns:base.turns.map((t,i)=>({...t,
   speech:stage==='toddler'?toddlerSpeech[scenario.id][i]:t.speech,
   choices:t.choices.map((choice,j)=>stage==='toddler'&&j===0?toddlerSupport[scenario.id][i]:choice),
   focus:t.focus.filter(id=>ids.has(id))}))};
 }
 delete scenario.variants.early;
}
export function getLens(stage){return STAGES[stage].lens;}
export function getVariant(scenario,stage,name='Mia') {
 const v=scenario.variants[stage];if(!v)return null;
 return {...v,intro:v.intro.replaceAll('Mia',name),turns:v.turns.map(t=>({...t,speech:t.speech.replaceAll('Mia',name),choices:t.choices.map(c=>c.replaceAll('Mia',name))}))};
}
export function checkpointDirection(styleId,factorId,relevant=true) {
 if(!relevant||!styleId)return {kind:'unshown',label:'Not shown',position:null};
 if(styleId==='level1')return {kind:'supported',label:'Supported',position:82};
 if(styleId==='level2')return {kind:['safety','connection','belonging','trust','emotion','confidence','voice'].includes(factorId)?'supported':'mixed',label:['safety','connection','belonging','trust','emotion','confidence','voice'].includes(factorId)?'Supported':'Mixed',position:['safety','connection','belonging','trust','emotion','confidence','voice'].includes(factorId)?72:52};
 if(styleId==='level3')return {kind:['predictability','boundaries'].includes(factorId)?'strained':'mixed',label:['predictability','boundaries'].includes(factorId)?'Strained':'Mixed',position:['predictability','boundaries'].includes(factorId)?25:48};
 if(styleId==='level4')return {kind:'strained',label:'Strained',position:24};
 if(styleId==='level5')return {kind:'safety',label:'Safety concern',position:10};
 return {kind:'unshown',label:'Not shown',position:null};
}
export function imaginedPerspective(styleId,lens) {
 const texts={
 trust:['You’re here when I need comfort.','You’re nearby. I’m still settling.','I’m not sure what will happen when I signal.','The loud voice feels frightening.','I need to be kept safe.'],
 autonomy:['I can try a little part, and help is here.','It feels okay to try, though I still need guidance.','I’m not sure which rule applies now.','Maybe trying things gets me blamed.','I’m worried I could be hurt.'],
 initiative:['My ideas are welcome. I can try again.','I can try, but I’m still figuring out the next step.','The plan keeps changing when I get upset.','Maybe my ideas cause trouble.','I’m scared to act or ask.'],
 industry:['I can learn a strategy. A mistake doesn’t make me incapable.','There’s support, but I could use a clearer plan.','I’m unsure what effort is expected of me.','Maybe a mistake means I’m not good enough.','I need safety before I can focus on learning.'],
 identity:['I can have my own view and still be connected.','I feel some support. I’d like more room to explain.','I’m unsure whether the agreement will hold.','It feels like disagreement makes me unacceptable.','I don’t feel safe disagreeing or being honest.'],
 };
 const idx=STYLES.findIndex(s=>s.id===styleId);
 return idx<0?'There could be several ways to experience these words. This prototype has not interpreted them.':texts[lens][idx];
}
export function responseExplanation(styleId,lens) {
 const style=STYLES.find(s=>s.id===styleId);
 if(!style)return 'This response has not been classified. Consider how the words or action acknowledge the feeling and offer appropriate support.';
 if(lens==='trust')return ({
  level1:'The action notices a distress cue and offers calm, familiar support. The trust lens focuses on responsive, dependable care. This is an educational adaptation of the supportive pattern, outside MAPS’s original infant validation range.',
  level2:'The action offers warmth and nearby comfort, with less detail about attending to changing cues. The trust lens focuses on noticing signals and keeping support dependable.',
  level3:'Soothing and withdrawal change unpredictably as distress changes. This illustrates inconsistency in responding to cues. Infants depend on caregivers for comfort; crying is a signal, not a rule violation.',
  level4:'Anger or blame is directed at a distress cue. This illustrates hostility. The trust lens prioritizes safety and sensitive care rather than demanding that an infant manage distress alone.',
  level5:'Threatened physical punishment makes safety the immediate concern. Infants need protection and responsive care. This harmful exemplar is not an acceptable soothing or discipline strategy.',
 })[styleId];
 if(styleId==='level1')return ({
  autonomy:'The response leaves a small, safe part of the action to Mia while offering support. The autonomy lens focuses on trying and choosing without shame. This illustrates supportive and structured parenting.',
  initiative:'The response welcomes an idea and makes the next step manageable. The initiative lens focuses on purpose and participation without turning mistakes into guilt. This illustrates supportive and structured parenting.',
  industry:'The response recognizes effort and makes room for a workable next step. The industry lens focuses on developing competence without equating mistakes with inferiority. This illustrates supportive and structured parenting.',
  identity:'The response hears a perspective while preserving an understandable agreement. The identity lens focuses on interests, values, and decisions without imposing an identity. This illustrates supportive and structured parenting.',
 })[lens];
 return style.why;
}
export function repairSuggestion(styleId,lens) {
 if(lens==='trust')return ({
  level1:'Stay responsive to the cue and keep the comforting action calm and familiar.',
  level2:'Pause to notice whether the cue changes, then offer steady comfort.',
  level3:'Slow down and choose a calm, dependable soothing response. Keep noticing the cue.',
  level4:'Lower your voice, check comfort needs, and offer gentle, responsive care.',
  level5:'Stop the threat and protect physical safety. If you feel close to losing control, place the infant safely and seek help from a trusted adult before resuming care.',
 })[styleId] || 'Notice the distress cue and offer calm, responsive care.';
 if(styleId==='level1' && lens==='identity')return 'Keep the shared agreement clear and invite a proposal that leaves room for an independent view.';
 if(styleId==='level1' && lens==='industry')return 'Recognize the effort and practice one workable next step together.';
 return STYLES.find(s=>s.id===styleId)?.repair || 'Listen, explain a realistic limit, and offer a manageable next step.';
}
