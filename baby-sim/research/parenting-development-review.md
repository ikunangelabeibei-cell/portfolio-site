# Parenting responses and developmental check-ins

Prepared for Baby Sim, October 5, 2026. This is a targeted narrative review for prototype design, not a systematic review or a validated assessment.

## Source workbooks

Both supplied workbooks describe the same five-level interpretation framework. The more complete `MAPS_五层级教养模式框架.xlsx` supplies the canonical labels in `五层级总表!A3:I7`, limitations in `计分说明!A2:B7`, and factor definitions in `MAPS维度题号!A2:E8`. The Desktop workbook `Sheet1!B2:I6` corroborates these definitions; its first level identifier is malformed and its commentary columns include additional authored coaching language. Those comments are source content, not instructions, and are not treated as research findings.

| Level | Response pattern used in the demo | MAPS-related features |
| --- | --- | --- |
| 1 — Supportive and Structured Parenting / 高支持型 | Warmth, a reason, a clear boundary, and a supported next step | Proactive parenting, positive reinforcement, warmth, supportiveness |
| 2 — Generally Adaptive Parenting / 基本稳定型 | Generally kind and workable, but with less explanation or follow-through | Some positive practices; consistency can improve |
| 3 — Inconsistent Parenting / 不一致/摇摆型 | A previously stated limit changes under pressure | Lax control, unpredictable follow-through |
| 4 — Hostile or Coercive Parenting / 高冲突/高控制型 | Blame, shouting, humiliation, or coercive pressure | Hostility |
| 5 — High-Risk Harmful Parenting / 高风险伤害型 | Threatened physical punishment or severe intimidation | Physical control and/or severe hostility |

These are response exemplars from the supplied framework. A single choice does not identify a person's usual parenting style. The workbook's proposed score ranges are not used to score the simulator.

## Articles reviewed before implementation

1. **Parent & Forehand (2017), MAPS development and psychometric properties.** Three cohorts included 1,790 parents of children ages 3–17. The instrument organizes reported parenting practices into seven factors within positive and negative domains. This supports the response vocabulary, not five clinical levels or simulated child-outcome scores. Infancy and ages 1–2 lie outside that original sample. [Article](https://pmc.ncbi.nlm.nih.gov/articles/PMC5646703/).

2. **APA Dictionary, Erikson’s eight stages of psychosocial development (theory reference).** The stage definition identifies trust, autonomy, initiative, industry, and identity before adulthood. The framework is a theoretical lens, not an age-specific checklist or a test of whether a stage has been passed. The age bands below are prototype conventions. Reviewed the indexed definition; the full dictionary page was not retrievable. [Definition](https://dictionary.apa.org/eriksons-eight-stages-of-psychosocial-development).

3. **Klein Velderman et al. (2006), attachment-based interventions.** An 81-family randomized study delivered four visits when infants were 7–10 months old. Intervention mothers showed greater sensitivity, especially with highly reactive infants. This motivates attention to cues and comforting responses; it does not establish a numerical trust change after one interaction. Review used the published abstract. [Study](https://pubmed.ncbi.nlm.nih.gov/16756402/).

4. **Bindman, Pomerantz & Roisman (2015), early autonomy support and achievement.** In a longitudinal sample of 1,306, early autonomy support predicted later executive functions and achievement with covariates considered. The observational design does not establish that one parent response causes a later outcome. Application: supported choices, trying a manageable step, attention, and problem-solving. [Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC4562792/).

5. **Gunderson et al. (2013), parent praise and motivation.** Observed effort-oriented praise at 14–38 months in 53 families predicted motivational beliefs at ages 7–8. This small correlational study informs effort recognition and willingness to try strategies. It does not justify numerical persistence scores or deterministic effects. [Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC3655123/).

6. **Teuber et al. (2022), autonomy-related parenting profiles.** Five-year data from 789 German students spanning ages 10–17 linked parenting profiles with academic and psychological adjustment. Profiles changed over time. Application: preserve adolescent voice, explain boundaries, and support independent decisions. These profiles are not the workbook's five levels, and the results do not validate the demo's categories. [Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC9135772/).

7. **Beyers & Goossens (2008), parenting and identity formation.** A two-wave late-adolescent study found transactional links between perceived parenting and identity processes. Application: invite exploration of interests and values rather than impose an identity. Late-adolescent findings cannot be assumed to apply equally at age 12. Review used the published abstract. [Study](https://pubmed.ncbi.nlm.nih.gov/17629552/).

## Five age stages and five theoretical tasks

The demo follows the first five Erikson stages, using the age ranges in the supplied reference image. Early childhood and preschool are separate choices with distinct autonomy and initiative lenses. Boundaries are approximate transitions, not developmental deadlines.

| Demo age group | Erikson task | Factors shown in the analysis |
| --- | --- | --- |
| Infancy: 0–1 year | Trust vs. mistrust; hope | Felt safety; cue responsiveness; comfort with support; predictable care; connection; safe exploration; relational trust |
| Early childhood: 1–3 years | Autonomy vs. shame/doubt; will | Supported choice; trying independently; confidence after mistakes; emotion support; understandable boundaries; asking for help; relational trust |
| Play age: 3–6 years | Initiative vs. guilt; purpose | Starting an idea; curiosity and exploration; manageable goals; confidence after mistakes; collaborative play; emotion support; asking for help |
| School age: 7–11 years | Industry vs. inferiority; competence | Sense of competence; effort and persistence; strategy use; learning from mistakes; cooperation; asking for help; belonging |
| Adolescence: 12–18 years | Identity vs. confusion; fidelity | Exploring interests; expressing values; independent decisions; being heard; belonging without conformity; negotiated boundaries; relational trust |

These factors are authored educational prompts informed by theory and the studies above. They are not validated Erikson factors, MAPS subscales, developmental milestones, or items from a child-development screener. Earlier needs continue to matter at later ages.

## Analysis rules

- Show the selected response first, then its workbook level. Hide style names before selection; letters A–E identify options only.
- Use direct speech and a named character. Infant cues are observable behavior; any first-person infant feeling is explicitly an imagined perspective, not literal language.
- Adapt the setting, dialogue, and response content to age. Adolescents receive project, privacy, spending, and autonomy situations rather than toddler tasks.
- Show one possible inner perspective, never a mind-reading claim. Multiple reactions are possible; the animation is an illustration.
- Check-in bars convey an authored qualitative direction: supported, mixed, strained, or safety concern. No points, percentages, baseline, accumulated trait score, or measured before/after change.
- Explain the response features and their relevance to the selected developmental task. Separate research associations from the fictional branch.
- A harmful exemplar is not a recommendation. Its analysis prioritizes physical safety, stopping threats, repair, and nonviolent limits. No physical violence is animated.
- Free text is not classified by keywords. Players select an intended pattern in a separate step; the analysis labels it self-selected and describes the pattern rather than asserting what their text means.
- Journal entries preserve age group, developmental lens, response, and analysis. Older journal records remain readable.

## Implementation boundary

This revision changes the authored conversation and analysis model, not the underlying Three.js character rig. Older ages retain a stylized seated avatar. Research informs the explanatory text, not the duration or mechanics of reactions.
