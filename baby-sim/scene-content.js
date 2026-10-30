// Plain-language scene framing and authored child reactions for each variant in parenting-model.js. Illustrative only, not predicted outcomes.
export const STAGE_INFO = {
  infant:{short:'Baby',ages:'0–1',icon:'🍼',blurb:'Crying, feeding, sleep, and learning to trust.'},
  toddler:{short:'Toddler',ages:'1–3',icon:'🧸',blurb:'First words, big feelings, and wanting to do it themselves.'},
  preschool:{short:'Preschooler',ages:'3–6',icon:'🎨',blurb:'Big ideas, pretend play, and learning to take turns.'},
  school:{short:'School age',ages:'7–11',icon:'🎒',blurb:'Homework, teamwork, and learning from mistakes.'},
  teen:{short:'Teen',ages:'12–18',icon:'🎧',blurb:'Privacy, independence, and finding their own voice.'},
};
const scene=(summary,need,skill,beats,replies)=>({summary,need,skill,beats,replies});
export const SCENE_INFO = {
 tower:{
  toddler:scene('Mia’s block tower falls down and they look to you. Toddlers want to do things themselves but get upset when it goes wrong.','Help to try again without feeling bad about the fall.','Supporting a fresh try',
   ['Mia stacks blocks on the rug, concentrating hard.','One wobble, and the tower crashes down.','Mia looks up at you.'],[
   ['“Red one!” Mia grabs a block and sets it down.','“Again!” Mia picks up a block.','“New toy?” Mia glances at the blocks, then away.','“Sorry…” Mia drops the block and goes quiet.','Mia freezes, then backs away from the blocks without a sound.'],
   ['“Me do it!” Mia sets a block on top, beaming.','“Slow…” Mia places a block carefully.','“No, me…” Mia watches you build, hands empty.','“Me bad.” Mia stares at the floor.','Mia goes silent, shoulders up, and won’t touch the blocks.'],
   ['“This one!” Mia holds up a long block, grinning.','“Yay!” Mia claps and reaches for another block.','“Anywhere?” Mia drops blocks in a pile, unsure.','“Okay…” Mia puts the block where you point, eyes down.','Mia pulls their hands into their lap and doesn’t move.']]),
  preschool:scene('Mia’s block tower collapses in the middle of play. At this age children have big ideas and can feel discouraged when a plan falls apart.','Encouragement to try again and a sense their ideas are welcome.','Encouraging new ideas',
   ['Mia is building the tallest tower yet.','A block slips and the whole thing scatters across the rug.'],[
   ['“The blue one first! It’s the biggest.” Mia starts a new base.','“Okay. I’ll try again.” Mia picks up a block.','“A new toy? But… my tower.” Mia looks unsure.','“I didn’t mean to.” Mia’s voice goes small.','Mia goes very quiet and slides away from the blocks.'],
   ['“You hold the bottom. I’ll put this one on.” Mia concentrates.','“Okay. Slowly.” Mia places a block with care.','“But I wanted to do it.” Mia watches you build.','Mia wipes their eyes fast and says nothing.','Mia stops crying at once and won’t look at you.'],
   ['“I want to make a bridge! Like this!” Mia lays a block across two others.','“Thanks! Can I try a bridge?” Mia grins.','“Anywhere? Okay…” Mia piles blocks without much interest.','“Fine. Your way.” Mia pushes the blocks toward you.','Mia puts the block down and sits very still, hands in lap.']]),
  school:scene('Mia’s school project breaks just before it’s finished. Children this age often feel a setback says something about how capable they are.','To see the problem as fixable and their effort as worthwhile.','Supporting effort after a setback',
   ['Mia has spent all afternoon on a model for school.','The last piece goes on, and the whole thing falls apart.','Mia stares at the pieces.'],[
   ['“Maybe the base? It wobbled the whole time.” Mia leans in to look.','“Okay. Yeah, maybe we can fix it.”','“So you’ll just do it? I thought I had to.”','“I did try properly.” Mia’s voice goes flat and quiet.','Mia goes silent, pushes the pieces away, and won’t look up.'],
   ['“We could tape a bigger piece under it and test it!”','“Okay. I’ll try it.” Mia measures carefully.','“Wait, so we’re not testing my idea?” Mia frowns.','“Fine. Tell me what to do.” Mia stops suggesting things.','Mia stops talking and sits very still, waiting.'],
   ['“I’ll tell her I tested the base and you helped me think.”','“Thanks. I did work really hard.”','“Isn’t that lying, though?” Mia looks uncertain.','“Okay. I won’t tell anyone.” Mia looks away.','Mia nods quickly, says nothing, and leaves the table.']]),
  teen:scene('A project Mia cares about fails a test, and they wonder whether to give up. Teens need room to make their own choices while knowing you’re on their side.','To be listened to, without someone taking over.','Listening without taking over',
   ['Mia has worked on an application project for weeks.','The test run fails again.','Mia closes the laptop.'],[
   ['“Just listen for a sec. Then maybe help with the next test.”','“Thanks. I just need a minute.”','“Wait, so the deadline doesn’t matter now?”','“It’s my future, not yours.” Mia turns away.','Mia goes quiet and leaves the room without another word.'],
   ['“Can you check my test plan? I’ll make the calls.”','“Okay. I’ll let you know.”','“That’s literally the opposite of what I asked.”','“Okay. Whatever you say.” Mia stops talking.','Mia nods, says nothing, and keeps their distance.'],
   ['“There’s a design course I’ve been looking at. Can I show you?”','“Okay. Maybe this weekend?”','“So you don’t really care what I pick?”','“Right. Never mind.” Mia shuts the conversation down.','Mia doesn’t answer and avoids your eyes.']]),
 },
 milk:{
  infant:scene('A cup tips over at breakfast and Mia is startled. Babies can’t say what’s wrong, so you read their signals while handling the mess.','Calm, close comfort so the surprise can pass.','Reading a baby’s cues',
   ['Breakfast is nearly done.','A cup tips and splashes across the tray.','Mia startles and stiffens.'],[
   ['Mia’s breathing slows. They lean into your hand, eyes on your face.','Mia’s fussing softens to small whimpers as they watch you wipe.','Mia quiets, then fusses louder each time your hand leaves. Their eyes follow you.','Mia flinches at your voice and goes still, lower lip trembling.','Mia freezes, then turns away and pulls their hands to their chest.'],
   ['Mia’s shoulders drop. They grip your finger and the fussing fades.','Mia settles a little, listening to your voice as the tray gets cleaner.','Mia stops, starts, and stops again, watching your face to guess what comes next.','Mia’s cry breaks off into a startled hush. They stare at the tray.','Mia goes silent and very still, eyes wide, no longer reaching for you.'],
   ['Mia pats the cup, takes a sip with your help, then turns away, done.','Mia reaches for the cup and holds it with you, calm and curious.','Mia reaches, loses the cup, and cries; when it returns, they hesitate before reaching.','Mia’s hand drops. They look at you, then away, and stop reaching.','Mia pulls their hands in close and turns their face from the cup and from you.']]),
  toddler:scene('Mia spills milk at breakfast and freezes, watching your face. Small accidents are a chance to show that mistakes can be fixed.','To know the spill is okay and that they can help fix it.','Calm response to accidents',
   ['Breakfast is on the table.','Mia reaches for the cup and it tips over.','Milk spreads everywhere. Mia freezes.'],[
   ['“Me wipe!” Mia pats the cloth on the milk.','“Okay…” Mia watches you, then grabs the cloth.','“No wipe?” Mia looks at the cloth, then at you.','“Sorry…” Mia shrinks back in the chair.','Mia freezes, eyes wide, and pulls their hands off the table.'],
   ['“Me did it!” Mia wipes one patch and grins.','“Again!” Mia tries another wipe.','“Me help?” Mia stands by, empty-handed.','“Me bad…” Mia drops the cloth and looks down.','Mia stops moving and won’t touch the cloth.'],
   ['“Slow… slow…” Mia pours a little with you.','“Me pour!” Mia pours carefully, peeking at you.','“More! More!” Mia keeps pouring, glancing at you.','“No pour.” Mia pushes the cup away.','Mia hides their hands under the table and stays silent.']]),
  preschool:scene('Mia knocks over a cup of milk and asks if you’re mad. Your reaction helps them learn whether mistakes are something to fix or something to hide.','Reassurance and a small job so they can help put it right.','Turning a mistake into a job',
   ['It’s a busy breakfast.','Mia’s elbow bumps the cup and milk runs across the table.','Mia freezes, watching your face.'],[
   ['“Okay! I’ll do this bit.” Mia starts wiping their patch.','“Okay.” Mia relaxes a little and reaches for a cloth.','“So I don’t have to help?” Mia hovers, unsure.','“I’m not careless…” Mia’s eyes fill up.','Mia goes silent and slides down in the chair.'],
   ['“Like this? Look, it’s working!”','“Okay, I’ll try again.” Mia wipes slowly.','“But I wanted to do it.” Mia watches you clean.','“I can’t do anything right.” Mia lets go of the cloth.','Mia stops wiping and stays very still, not looking up.'],
   ['“I’m going slow! Is that enough?”','“I’ll be careful.” Mia pours with both hands.','“All of it?” Mia keeps pouring, glancing at you.','“I don’t want any.” Mia pushes the cup away.','Mia pulls their hands back and doesn’t answer.']]),
  school:scene('Mia spills a jug while helping make lunch. Children this age want to be capable helpers, and a mistake can quickly feel like failure.','To hear that helping still counts and the spill can be fixed.','Responding to accidents calmly',
   ['Mia is helping with lunch.','The jug slips and spills across the floor.','Mia steps back, eyes on you.'],[
   ['“Move the chair so no one slips? Then get a towel?”','“Okay. I’ll grab something.”','“So I don’t have to clean it?” Mia hesitates.','“I’m not useless.” Mia’s voice cracks, and they step back.','Mia freezes, then backs toward the door without a word.'],
   ['“Cups first, then towel. Got it.” Mia starts moving cups.','“Okay.” Mia fetches a towel.','“Which one? You said cups first.” Mia looks unsure.','“Sorry. Forget it.” Mia stops asking.','Mia goes quiet and waits, not moving.'],
   ['“I’ll hold it with two hands this time.”','“Okay. Slowly.” Mia pours carefully.','“The big one, then?” Mia reaches for the big jug, unsure.','“Fine. I won’t help anymore.” Mia walks away.','Mia puts the jug down fast and leaves the kitchen.']]),
  teen:scene('Mia spills a drink while making food for friends and feels embarrassed. Teens care a lot about how they look in front of others.','To fix it themselves without being embarrassed.','Respecting pride and privacy',
   ['Mia’s friends are in the next room.','A drink tips over on the counter.','Mia glances toward the door.'],[
   ['“Nope, I’m good. Thanks for being chill.”','“Thanks.” Mia grabs the towel.','“Wait, I can just leave it?” Mia looks confused.','Mia’s face goes red. “Seriously?” They turn away.','Mia goes pale and silent, eyes on the floor.'],
   ['“Thanks. I’ve got it from here.”','“Cool.” Mia finishes wiping.','“I said I’d handle it.” Mia steps back, frustrated.','“Forget it.” Mia stops asking.','Mia steps back and doesn’t ask for anything else.'],
   ['“Like, I clean it up, and you don’t comment in front of people?”','“Thanks. That’s all I want.”','“So there are no rules at all now?” Mia frowns.','“Fine. I’ll just stay out of your way.”','Mia goes quiet and leaves the room.']]),
 },
 bed:{
  infant:scene('At bedtime Mia fusses as you head for the door. Tired babies often need help settling, and it’s hard to stay patient when you’re tired too.','A calm, familiar presence while they drift toward sleep.','Soothing at bedtime',
   ['The room is dim and quiet.','You lay Mia down and step toward the door.','A thin cry follows you.'],[
   ['Mia’s cry softens. They turn toward your voice and their breathing slows.','Mia whimpers a little longer, then quiets, listening to you.','Mia settles, then cries harder each time the routine changes, searching for you.','Mia startles at your sharp voice, then cries in short, shaky bursts.','Mia goes rigid and silent, eyes wide in the dark.'],
   ['Mia’s fingers curl around yours. Their eyelids grow heavy.','Mia lowers their arms and listens, blinking slowly.','Mia reaches again and again, unsure whether you are coming or going.','Mia pulls their arms back and whimpers into the blanket.','Mia stops reaching and lies very still, watching the doorway.'],
   ['Mia sighs, stretches, and sinks back into sleep.','Mia stirs, hears you, and slowly drifts off again.','Mia wakes fully, fussing more each time you pull away and come back.','Mia’s whimper catches. They turn their face away, awake and tense.','Mia lies stiff and quiet, too unsettled to sleep.']]),
  toddler:scene('The bedtime story is over, but Mia wants you to stay. Toddlers often resist bedtime because they don’t want to be apart from you.','Closeness and a goodnight they can count on.','Holding a gentle bedtime limit',
   ['The last page of the story turns.','Mia hugs the book tight against their chest.','Their eyes are heavy, but they look up at you.'],[
   ['“Bear!” Mia snuggles in for the cuddle.','“Cuddle!” Mia leans against you.','“More! More!” Mia bounces, wide awake.','Mia drops the book and pulls the blanket over their face.','Mia goes stiff and silent under the blanket.'],
   ['“Bear stay.” Mia hugs the bear, eyes closing.','“Bear…” Mia holds the bear tight.','Mia cries louder, watching the door.','“No baby…” Mia sniffles quietly into the pillow.','Mia stops crying at once and lies very still.'],
   ['“Bear story!” Mia yawns and closes their eyes.','“Okay.” Mia settles under the blanket.','“Me no sleep!” Mia sits up again.','Mia turns to the wall without a word.','Mia lies frozen, eyes open in the dark.']]),
  preschool:scene('After the bedtime story, Mia says they’re not tired and asks you to stay. Children this age test bedtime limits and can also feel real worry about being alone.','A caring routine with a clear end, and a plan for feeling lonely.','A bedtime routine with comfort',
   ['The story ends.','Mia holds the book close and wriggles under the covers.','They aren’t ready to say goodnight.'],[
   ['“The rabbit! Rabbit gets a cuddle too.” Mia settles down.','“Okay. A big cuddle.” Mia snuggles in.','“Then I can stay up more? And more?” Mia sits up.','“I’m not arguing…” Mia whispers, pulling up the blanket.','Mia goes quiet and lies very still under the covers.'],
   ['“The rabbit. And you’ll come back?” Mia hugs it close.','“Okay.” Mia holds the bear and sniffles.','“So I have to cry loud?” Mia sounds confused.','“I’m not a baby.” Mia turns away, quiet.','Mia stops talking and hides under the blanket.'],
   ['“The dragon story! Save it for tomorrow.” Mia yawns.','“Yay.” Mia smiles and closes their eyes.','“So tomorrow I don’t have to go to bed?” Mia grins.','“Okay…” Mia says softly, and doesn’t ask anything else.','Mia doesn’t answer and stays very still in the dark.']]),
  school:scene('Mia can’t sleep because of a class presentation tomorrow. Bedtime worry is common, and the challenge is helping without letting the night run away.','Help shrinking the worry, and permission to rest.','Easing worry before sleep',
   ['It’s past bedtime.','Mia packs and repacks their school bag.','They keep glancing at the clock.'],[
   ['“The beginning. I always mess up the beginning.”','“Yeah. It’s really stressful.” Mia sits on the bed.','“So I can stay up? All night?” Mia looks unsure.','“I did prepare.” Mia turns away, quiet.','Mia stops talking and pulls the covers up tight.'],
   ['“A cue card. Okay. That makes it feel smaller.”','“I guess I could look at my notes.”','“Wait, I don’t have to present?” Mia looks confused.','“So I’m going to fail.” Mia stares at the ceiling.','Mia goes very still and doesn’t answer.'],
   ['Mia practices the first line, smiles, and lies down.','“Okay. ‘Today I’m going to tell you…’” Mia begins.','“Again? And again?” Mia keeps going, wide awake.','“Fine. Never mind.” Mia rolls over.','Mia stops asking and lies silent in the dark.']]),
  teen:scene('Mia is still texting friends after the agreed phone-off time. Teens want independence and connection, and parents still need to protect sleep.','A say in the rules, and a limit they understand.','Negotiating screen limits',
   ['It’s past the agreed wind-down time.','Mia’s phone lights up again.','They look up as you reach the door.'],[
   ['“Ten more minutes, then I charge it outside my room?”','“Okay. Let me say goodnight to them.”','“So I can keep it? Cool…” Mia sounds unsure.','“Wow. Okay.” Mia rolls their eyes and goes quiet.','Mia hands over the phone fast and won’t look at you.'],
   ['“Okay. Try it for two weeks, then talk again?”','“Okay. Tomorrow, then.”','“So now there are no rules? That’s weird.”','“Great. Thanks a lot.” Mia turns to the wall.','Mia stops talking and goes silent.'],
   ['“Midnight on weekends, as long as I still get eight hours?”','“Cool. Can we talk tomorrow?”','“Whenever I want? Okay…” Mia sounds doubtful.','“Never mind. Forget I asked.”','Mia stays quiet and keeps their eyes on the floor.']]),
 },
 share:{
  toddler:scene('A friend wants the toy Mia is playing with. Toddlers are only just learning about turns, and big feelings come fast.','Help holding on until they’re done, then letting go.','Teaching turn-taking',
   ['Sam has come over to play.','Mia is clutching their favorite truck.','Sam reaches for it.'],[
   ['“My turn… then Sam.” Mia keeps playing, calmer.','“Okay.” Mia keeps playing, eyeing Sam.','“Mine forever!” Mia hugs the truck tight.','“Not selfish…” Mia lets go and looks down.','Mia lets go and backs away, eyes wide.'],
   ['“Back, please?” Mia holds out a hand to Sam.','“Mine, please!” Mia stands close to you.','Mia grabs it back, then looks at you, unsure.','Mia sits down alone, crying quietly.','Mia stops crying at once and goes still.'],
   ['“Me timer!” Mia watches the timer, waiting.','“This one?” Mia picks up the other toy.','“Now? Now?” Mia reaches for the truck again.','Mia sits apart, quiet, not playing.','Mia stays frozen in the corner, not making a sound.']]),
  preschool:scene('During a playdate, a friend wants the toy Mia is using. Sharing takes practice, and children this age need help with fair turns.','A fair plan for turns and help with frustration.','Supporting fair turns',
   ['Sam has come over for a playdate.','Mia is deep in a game with their favorite toy.','Sam reaches for it.'],[
   ['“Sam, when my rocket lands you can have a turn.”','“Okay. One more bit, then Sam.”','“So I never have to share?” Mia clutches the toy.','“I’m not selfish!” Mia lets go and folds their arms.','Mia drops the toy and backs away without a word.'],
   ['“Sam, can I have it back, please? Then you get the next turn.”','“Give it back, please!” Mia looks to you.','Mia grabs it back, then glances at you, unsure.','“Nobody likes me.” Mia sits down by themselves.','Mia goes quiet at once and stays very still.'],
   ['“I’ll set the timer! Then I’ll build a garage.”','“Okay. I’ll play with this one.”','“I can just take it?” Mia reaches for it again.','Mia sits down without a word, arms crossed.','Mia stays silent and doesn’t move from the corner.']]),
  school:scene('Mia and a classmate are building a shared model, and Mia feels the work is unfair. Speaking up and sorting it out fairly is a big skill at this age.','Help finding words to sort it out fairly.','Coaching fair teamwork',
   ['Mia and Sam spread their project across the kitchen table.','Sam has already claimed the fun part.','Mia comes over, frowning.'],[
   ['“Maybe we each do half the painting?”','“Okay. Can you come with me?”','“So I can just stop?” Mia looks back at the project.','“I’m not difficult.” Mia goes quiet.','Mia stops talking and goes back to the table without a word.'],
   ['“‘Can we swap one part?’ Okay. I can say that.”','“Okay. I’ll ask calmly.”','“Just take it? Wouldn’t Sam be upset?” Mia hesitates.','“Then I won’t say anything.” Mia drops it.','Mia doesn’t say anything to Sam at all.'],
   ['“Glue! We forgot who brings the glue.”','“Here.” Mia holds up the plan, smiling.','“So we can skip the boring bits?” Mia looks unsure.','“Sorry I asked.” Mia folds the plan away.','Mia puts the plan away and won’t ask for anything else.']]),
  teen:scene('Mia is upset that a sibling borrowed their jacket without asking. Teens need some privacy and control over their own things, inside fair family rules.','To have their boundary taken seriously.','Supporting fair boundaries',
   ['Mia’s sibling walks past wearing Mia’s jacket.','Nobody asked.','Mia comes to find you.'],[
   ['“They should just text me first. That’s it.”','“Thanks. That would help.”','“So it only counts until they complain?”','“I’m not selfish.” Mia goes quiet and leaves.','Mia goes silent and backs out of the room.'],
   ['“Ask first, and I can say no if I need it.”','“Yeah. That’s all I want.”','“Then it’s not really a choice.” Mia frowns.','“Fine.” Mia stops arguing and turns away.','Mia goes quiet and doesn’t say anything else.'],
   ['“Okay. And they can say what they need too.”','“Cool. Thanks.”','“So what’s the point of rules?” Mia sighs.','“Forget it. I’ll stop asking.”','Mia drops it and avoids you for the rest of the day.']]),
 },
 store:{
  infant:scene('The grocery store is loud and bright, and Mia becomes overwhelmed. You notice the signs and decide how to calm things down in public.','Less noise and light, and a familiar voice close by.','Easing overwhelm in public',
   ['The aisles are busy and bright.','A cart rattles past.','Mia flinches and turns their face away.'],[
   ['In the quieter corner, Mia’s cry fades to hiccups as they find your face.','Mia’s cry eases as you lean in close.','Mia calms, then cries again each time the noise comes back.','Mia cries harder at your raised voice, then turns away from you.','Mia goes silent and stiff in the seat, staring past you.'],
   ['Mia’s hands loosen. They rest their cheek against you.','Mia’s crying slows as the cart stops moving.','Mia keeps glancing between you and the noise, unsure what will happen.','Mia squeezes their eyes shut and whimpers quietly.','Mia pulls into themselves, hands tight, avoiding your eyes.'],
   ['Mia gazes up at you and coos softly as you head for the checkout.','Mia stays settled, watching the lights from your arms.','Mia starts fussing again as the plan keeps changing.','Mia looks away from you and stays quiet and tense.','Mia stays frozen and silent all the way to the car.']]),
  toddler:scene('At the store Mia spots a snack and wants it right now. Saying no in public, while staying kind, is one of the hardest moments with a toddler.','A calm no, plus something useful to do instead.','Saying no kindly in public',
   ['The shopping trip is almost done.','Mia spots a bright packet on the shelf.','Their arm shoots out to grab it.'],[
   ['“Pears!” Mia points, still sniffling.','“No snack…” Mia pouts but follows you.','“Mine!” Mia grabs it and looks at you, surprised.','Mia drops their arm and stares at the floor.','Mia goes silent and stiff in the cart.'],
   ['“Hug.” Mia leans into you, crying less.','“Break.” Mia sits with you, sniffling.','“Two!” Mia reaches for another packet.','Mia cries quietly, turned away from you.','Mia stops crying and won’t look at you.'],
   ['“Me hold!” Mia opens the bag wide.','“Apple!” Mia drops one in.','“Snack too!” Mia reaches for the shelf again.','“Me good…” Mia holds the bag very still.','Mia keeps their hands to themselves, silent.']]),
  preschool:scene('Mia wants a snack that isn’t on the shopping list. Children this age can learn that a calm no stays a no, especially when they get a job to do.','A clear, kind limit and a way to help with the shopping.','Kind and steady limits',
   ['You’re working through the shopping list.','Mia spots a bright packet of snacks.','They reach for it with both hands.'],[
   ['“Pears! The green ones!” Mia goes to choose.','“Fine…” Mia sighs and follows you to the fruit.','“If I cry, I get it?” Mia holds the packet tight.','“I’m sorry.” Mia lets go and looks at the floor.','Mia goes quiet and stays close to the cart, not moving.'],
   ['“Okay. Can I sit with you a minute?” Mia sniffles.','“Okay…” Mia takes a slow breath with you.','“And another one?” Mia reaches for a second packet.','Mia stops talking and stares at the shelf.','Mia freezes and won’t look at you.'],
   ['“I’m holding it wide! Pass me one!”','“I’m a good helper!” Mia drops in an apple.','“And the cookies too?” Mia looks back at the shelf.','“I’m not being difficult.” Mia mumbles, eyes down.','Mia keeps their hands still and says nothing.']]),
  school:scene('Mia wants to add a snack and thinks the budget allows it. This is a chance to let them practice real math and decision-making.','A chance to work it out themselves, with some support.','Letting them problem-solve',
   ['Mia holds the shopping list and a pencil.','They have been adding up prices all the way round.','Now they hold up a snack.'],[
   ['“Maybe we skip the juice? Let me add it up.”','“It’s this much.” Mia shows you the price.','“Anything? Really?” Mia looks unsure.','“I do understand.” Mia puts the snack back, quiet.','Mia puts it back quickly and goes silent.'],
   ['“Okay, bread plus… yes, now it works.”','“Okay.” Mia crosses it out and starts again.','“So the budget doesn’t matter?” Mia looks puzzled.','“I can add.” Mia tucks the list away.','Mia hands you the list and stops talking.'],
   ['“Yes! There’s still enough for milk.”','“Cool.” Mia puts the small pack in the cart.','“Both, then?” Mia looks between them, unsure.','“Fine. Whatever you want.” Mia steps back.','Mia stays quiet and keeps a careful distance.']]),
  teen:scene('Mia wants to buy a pricier item for a get-together with friends. Teens are working out their own values, and money is often where that shows.','To explain why it matters and help decide within limits.','Talking through money choices',
   ['You’re shopping for Mia’s get-together with friends.','Mia holds up something pricier than planned.','They take a breath before asking.'],[
   ['“It’s what we always have at Jamie’s. I could pay part?”','“Okay, so basically…” Mia starts explaining.','“Wait, any budget is fine? I could pay part anyway.”','“It’s not stupid.” Mia’s jaw tightens. “I could pay for it.”','Mia puts it back quietly and stops talking.'],
   ['“Okay. That still leaves enough for the movie. I’ll do it.”','“I think I’ve got enough. I’ll check.”','“So I don’t have to pay? I’m confused.”','“It’s my money.” Mia stares at you.','Mia goes silent and keeps their distance.'],
   ['“Thanks. That actually means a lot.”','“Okay. Thanks.”','“I don’t want you to just agree, though.”','Mia goes quiet and walks off down the aisle.','Mia stays silent for the rest of the trip.']]),
 },
};
// Two extra turns that continue a few scenes after turn 3. Same shape as parenting-model.js turns, plus replies.
const xturn=(speech,choices,focus,replies)=>({speech,choices,focus,replies});
SCENE_INFO.bed.infant.extraTurns=[
 xturn('Mia wakes later, rubs their eyes, and lets out a small cry.', ['“I’m here.” Go in calmly, check comfort needs, and repeat the same quiet soothing.','Return and offer a soft voice and a gentle hand.','Wait a while, then rush in and try something new each time the cry changes.','“Not again!” Sigh loudly and scold from the doorway.','Threaten to smack Mia if they keep waking up.'],['predictability','comfort','cues','trust'],
  ['Mia’s cry fades as your familiar hum begins. Their hand finds your sleeve.','Mia hiccups, hears your voice, and slowly settles.','Mia cries on and off, watching for what you will do next.','Mia’s cry shrinks to a whimper, and they turn their face away.','Mia goes silent and tense, eyes fixed on the dark doorway.']),
 xturn('Morning light comes in. Mia kicks their legs and looks toward you.', ['Smile, say good morning, and pick Mia up for a slow, close start to the day.','“Morning.” Lift Mia up and get on with the day.','Pick Mia up, put them down, then pick them up again without settling on a plan.','“You kept me up all night.” Lift Mia up with an angry sigh.','Threaten physical punishment if Mia wakes in the night again.'],['connection','exploration','trust','safety'],
  ['Mia coos and pats your face, then looks around the room, curious.','Mia blinks up at you and grips your shirt.','Mia fusses each time you set them down, unsure what comes next.','Mia goes quiet in your arms, watching your face carefully.','Mia stiffens and turns away, not reaching out.']),
];
SCENE_INFO.milk.toddler.extraTurns=[
 xturn('Me clean cup?', ['“Yes. You carry the cup to the sink. I’ll hold the door.”','“Okay. Careful now.”','“I said you can carry it, but no, I’ll do it so nothing spills.”','“No! You’ll just drop it.”','“Drop that cup and I’ll smack you.”'],['independence','choice','confidence','help'],
  ['“Me carry!” Mia walks slowly, both hands on the cup.','“Careful…” Mia holds the cup tight and walks.','“Me? No?” Mia reaches, then stops.','“No drop…” Mia lets go and steps back.','Mia pulls their hands away and goes very still.']),
 xturn('All done! Me did it?', ['“You did. You wiped, poured, and carried the cup. Want to put the cloth away?”','“Yes. Good job.”','“I said you did it, but actually I finished most of it.”','“Finally. Took you long enough.”','“Make that mess again and I’ll hit you.”'],['confidence','trust','choice','emotion'],
  ['“Me put away!” Mia runs to hang up the cloth.','“Me did it!” Mia claps.','“Me did? You did?” Mia looks puzzled.','Mia’s smile fades. They look at the floor.','Mia shrinks back and doesn’t say anything.']),
];
SCENE_INFO.bed.school.extraTurns=[
 xturn('What if I still can’t fall asleep?', ['“That happens sometimes. Let’s try slow breathing. Resting still counts, even if sleep takes a while.”','“Just lie still. You’ll drift off.”','“I said lights off, but read under the covers as long as you like.”','“You’re overthinking. Stop being dramatic.”','“Get up one more time and I’ll hit you.”'],['strategy','help','competence'],
  ['“In for four, out for four… okay.” Mia’s shoulders drop.','“Okay. I’ll try.” Mia closes their eyes.','“All night? Really?” Mia reaches for a book, unsure.','“I’m not dramatic.” Mia turns to face the wall.','Mia goes rigid and silent under the covers.']),
 xturn('It’s morning. I’m still nervous. Will you be proud even if it goes badly?', ['“Yes. I’m proud of how you prepared. However it goes, we’ll talk about what you learned.”','“Of course. You’ll be fine.”','“I said you should go, but you can stay home if you’re nervous.”','“Only if you don’t mess it up.”','“Embarrass this family and I’ll slap you.”'],['belonging','mistakes','effort','competence'],
  ['“Okay. I’ll take my cue card.” Mia stands a little taller.','“Okay. Thanks.” Mia picks up their bag.','“Wait, I can stay home?” Mia stops at the door, unsure.','“Great. No pressure.” Mia leaves without saying goodbye.','Mia goes pale, nods, and slips out without a word.']),
];
SCENE_INFO.bed.teen.extraTurns=[
 xturn('My friends will think I’m weird if I log off first.', ['“That matters. What could you say to them that feels true to you?”','“They’ll understand. Say goodnight.”','“I said phones off, but stay on if you think they’ll judge you.”','“If they think that, they’re bad friends, and you’re worse for caring.”','“Stay on that phone and I’ll hit you.”'],['belonging','values','voice','decisions'],
  ['“Maybe ‘Gotta sleep, talk tomorrow.’ That’s normal, right?”','“Yeah, maybe. Okay.”','“So the rule depends on my friends now?”','“You don’t get it.” Mia turns away.','Mia goes silent and puts the phone face-down without looking at you.']),
 xturn('We tried the plan for a week. Can we check how it went?', ['“Yes. What worked for you, and what would you change? I’ll share what I noticed too.”','“Sure. It seemed fine.”','“I said we’d review it, but let’s just forget the plan.”','“There’s nothing to review. You follow my rules.”','“Bring up that phone again and I’ll slap you.”'],['trust','decisions','boundaries','voice'],
  ['“Weeknights were fine. Fridays were harder. Can we adjust that?”','“Yeah. I think it went okay.”','“So we made a plan for nothing?” Mia frowns.','“Then why did we even make it?” Mia leaves the room.','Mia drops the subject and avoids you for the evening.']),
];
