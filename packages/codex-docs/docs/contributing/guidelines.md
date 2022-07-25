# Contributing guidelines

We welcome contributions from everyone! There are several ways to contribute:

- Adding or commenting on tasks in our project management system, Phabricator (links below)
- Contributing to the design process
- Suggesting new components and design tokens
- Writing and submitting code
- Reviewing code
- Updating and expanding library documentation

Contributions to Codex are covered by the [Code of Conduct for Wikimedia technical spaces](https://www.mediawiki.org/wiki/Special:MyLanguage/Code_of_Conduct).

## How to stay up-to-date

Consider following Codex design, development, roadmaps, and releases in these places:

- [Phabricator](https://phabricator.wikimedia.org/tag/design-systems-team/): used to track the
  work, and allows others the opportunity to subscribe to tasks, add comments, and claim tasks.
  [Learn more about the use of Phabricator at the Wikimedia Foundation](https://www.mediawiki.org/wiki/Phabricator/Project_management).
- [Team page](https://www.mediawiki.org/wiki/Design_Systems_Team): used to share information about
  the Design Systems Team's mission, vision, work streams, objectives/key results (OKRs), and
  roadmap.
- Mailing lists: used to share release notes and summaries for major and minor releases:
  - Wikimedia tech news mailing list ([wikitech-l](https://lists.wikimedia.org/postorius/lists/wikitech-l.lists.wikimedia.org/))
  - Wikimedia design mailing list ([design.public](https://lists.wikimedia.org/postorius/lists/design.lists.wikimedia.org/))
- [ADRs section](/adrs/overview): used to document technical decisions about the library.

## Task tracking

Tasks are tracked in Phabricator. We use three different Phabricator workboards, for three different purposes:

- [Codex](https://phabricator.wikimedia.org/tag/codex/): used to indicate that a task is related to
  Codex. We do not track task status here.
- [Design-Systems-Team](https://phabricator.wikimedia.org/tag/design-systems-team/): used to
  triage, sort, prioritize, and refine tasks that the Design Systems team and contributors will
  work on. 
- [Design-Systems-Sprint](https://phabricator.wikimedia.org/project/view/5859/): used to track
  active works-in-progress from Research > Design > Development > Testing > Release. As a
  contributor, you are welcome to track your work related to the Design System on this board as
  well—just remember to keep the task in the appropriate column that reflects its status.

> I want to know the status of something

Check the [Codex](https://phabricator.wikimedia.org/tag/codex/),
[Design-Systems-Team](https://phabricator.wikimedia.org/tag/design-systems-team/), and
[Design-Systems-Sprint](https://phabricator.wikimedia.org/project/view/5859/) workboards in
Phabricator to see if a task exists for that work (for detailed Phabricator search tips, visit
[this page](https://www.mediawiki.org/wiki/Phabricator/Help?tableofcontents=0#Searching_for_items)).
If so, the task will be in the column that represents its current status. If not, you can
create a task (see below) or contact us (see the
[Design Systems Team page](https://www.mediawiki.org/wiki/Design_Systems_Team) on mediawiki.org)

> I want to request a feature

You are welcome to create new tasks with the #Codex and #Design-Systems-Team tags. New tasks will
go into our "Needs Triage (Incoming Requests)" column and will be triaged regularly. Please remember
that Codex is maintained by a nonprofit—we won't be able to meet all feature requests, and it might
take time to get to your request.

To request a new component, please fill out the [component epic task template][epic-template].

> I want to follow parts of your work

[Create a Phabricator account](https://www.mediawiki.org/wiki/Phabricator/Help#Creating_your_account)
and add yourself as a subscriber to a task to get notified when updates are made.

> I want to contribute to a task

Great! Create or claim a task as soon as you decide to work on it. This will help avoid overlapping,
duplicate, or conflicting work. If you're creating a task, add as much detail as you can about the
scope of the task: for example, what needs to be completed before the task can be considered "done"?

[epic-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BEPIC%5D%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A-%20**History%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A-%20%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Previous%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20figma%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A-%20**Design%20style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdesign.wikimedia.org%2Fstyle-guide%2Findex.html%20%7C%20Design%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fphabricator.wikimedia.org%2FT272885%20%7C%20Vue%20component%20inventory%20%5D%5D.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer%27s%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer%27s%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0AA%20component%20spec%20sheet%20has%20not%20been%20created%20yet.%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%201%3A%20Minimum%20viable%20product%20(MVP)%0D%0A%0D%0AMVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Determine%20what%20MVP%20includes%20for%20this%20component%20and%20document%20this%20in%20a%20subtask.%20Assign%20task%20to%20designer.%0D%0A-%20%5B%5D%20Design%20MVP.%20Once%20complete%2C%20assign%20task%20to%20developer.%0D%0A-%20%5B%5D%20Implement%20MVP%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%202%3A%20Additional%20states%2C%20features%2C%20and%20variants%0D%0A%0D%0AThis%20might%20include%20a%20disabled%20state%2C%20framed%2Fframeless%20designs%2C%20transitions%2C%20supporting%20different%20use%20cases%2C%20etc.%2C%20which%20will%20be%20captured%20in%20separate%20subtasks.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Document%20design%20and%20implementation%20of%20additional%20states%20and%20features%20in%20individual%20subtasks%0D%0A-%20%5B%5D%20Complete%20each%20additional%20state%2Ffeature%20subtask%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%203%3A%20Refinement%0D%0A%0D%0AThis%20stage%20includes%20any%20final%20touches%20or%20bug%20fixes%20needed%20before%20the%20component%20can%20be%20deemed%20complete%2C%20which%20will%20be%20captured%20in%20separate%20subtasks.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Finalize%20docs%3A%20open%20and%20complete%20a%20subtask%20for%20any%20additional%20demos%20that%20need%20to%20be%20added%20or%20documentation%20that%20needs%20work%0D%0A-%20%5B%5D%20Meet%20accessibility%20standards%3A%20open%20and%20complete%20a%20subtask%20for%20any%20necessary%20accessibility%20improvements%0D%0A-%20%5B%5D%20Meet%20internationalization%20standards%3A%20open%20and%20complete%20a%20subtask%20to%20fix%20any%20i18n%20bugs%0D%0A-%20%5B%5D%20Complete%20testing%3A%20open%20and%20complete%20a%20subtask%20for%20any%20additional%20unit%20or%20functional%20tests%20that%20are%20needed&projects=design-systems-team%2C%20codex%2C%20epic&priority=triage
