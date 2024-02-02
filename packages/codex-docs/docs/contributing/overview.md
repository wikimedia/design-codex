# Contributing

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

- [Phabricator](https://phabricator.wikimedia.org/tag/design-system-team/): used to track the
  work, and allows others the opportunity to subscribe to tasks, add comments, and claim tasks.
  [Learn more about the use of Phabricator at the Wikimedia Foundation](https://www.mediawiki.org/wiki/Phabricator/Project_management).
- [Team page](https://www.mediawiki.org/wiki/Design_System_Team): used to share information about
  the Design System Team's mission, vision, work streams, objectives/key results (OKRs), and
  roadmap.
- Mailing lists: used to share release notes and summaries for major and minor releases:
  - Wikimedia tech news mailing list ([wikitech-l](https://lists.wikimedia.org/postorius/lists/wikitech-l.lists.wikimedia.org/))
  - Wikimedia design mailing list ([design.public](https://lists.wikimedia.org/postorius/lists/design.lists.wikimedia.org/))
- [ADRs section](../using-codex/adrs/overview): used to document technical decisions about the library.

## Task tracking

Tasks are tracked in Phabricator. We use two different Phabricator workboards:

- [Codex](https://phabricator.wikimedia.org/tag/codex/): used to indicate that a task is related to
  Codex. We do not track task status here.
- [Design-System-Team](https://phabricator.wikimedia.org/tag/design-system-team/): used to
  triage, sort, prioritize, and refine tasks that the Design System Team and contributors will
  work on. We track status of actively worked on tasks in
  [sprint milestones](https://phabricator.wikimedia.org/project/subprojects/5858/).

> I want to know the status of something

Check the [Codex](https://phabricator.wikimedia.org/tag/codex/) and
[Design-System-Team](https://phabricator.wikimedia.org/tag/design-system-team/) workboards in
Phabricator to see if a task exists for that work (for detailed Phabricator search tips, visit
[this page](https://www.mediawiki.org/wiki/Phabricator/Help?tableofcontents=0#Searching_for_items)).
If so, the task will be in the column that represents its current status. If not, you can
create a task (see below) or contact us (see the
[Design System Team page](https://www.mediawiki.org/wiki/Design_System_Team) on mediawiki.org)

> I want to request a feature

You are welcome to create new tasks with the #Codex and #Design-System-Team tags. New tasks will
go into our "Needs Triage (Incoming Requests)" column and will be triaged regularly. Please remember
that Codex is maintained by a nonprofit—we won't be able to meet all feature requests, and it might
take time to get to your request.

To request a new component, please fill out the [new component task template][new-component-phab-template].

> I want to follow parts of your work

[Create a Phabricator account](https://www.mediawiki.org/wiki/Phabricator/Help#Creating_your_account)
and add yourself as a subscriber to a task to get notified when updates are made.

> I want to contribute to a task

Great! Create or claim a task as soon as you decide to work on it. This will help avoid overlapping,
duplicate, or conflicting work. If you're creating a task, add as much detail as you can about the
scope of the task: for example, what needs to be completed before the task can be considered "done"?

[new-component-phab-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BComponentName%5D%3A%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0A%2F%2FNOTE%3A%20%20When%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A%23%23%23%20Description%0D%0A%0D%0A%2F%2FAdd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2FAdd%20at%20least%20one%20user%20story.%2F%2F%0D%0A%0D%0A%23%23%23%20History%0D%0A%0D%0A%2F%2FDescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20Known%20use%20cases%0D%0A%0D%0A%2F%2FDescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A%0D%0A%23%23%23%20Existing%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20figma%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A**Wikimedia%20community%3A**%0D%0A-%20**Design%20style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdesign.wikimedia.org%2Fstyle-guide%2Findex.html%20%7C%20Design%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name(s)%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fwww.mediawiki.org%2Fwiki%2FVue.js%23Projects_using_Vue.js%20%7C%20Projects%20using%20Vue.js%20%5D%5D.%2F%2F%0D%0A%0D%0A**External%20libraries%3A**%0D%0A-%20%2F%2FAdd%20links%20to%20any%20examples%20from%20external%20libraries%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer's%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer's%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%0D%0A-%20%2F%2FList%20any%20current%20open%20questions%20here%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0AA%20component%20spec%20sheet%20has%20not%20been%20created%20yet.%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A%23%23%23%23%20Anatomy%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20structure%20and%20properties%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Style%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20visual%20features%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Interaction%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20interaction%20specifications.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Documentation%0D%0A%0D%0A%2F%2FDesigner%20should%20describe%20how%20the%20component%20should%20be%20documented%2C%20including%20configurable%20and%20standalone%20demos.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Acceptance%20criteria%0D%0A%0D%0A%23%23%23%20Minimum%20viable%20product%0D%0A%0D%0AThis%20task%20covers%20the%20minimum%20viable%20product%20(MVP)%20version%20of%20this%20component.%20MVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A**MVP%20scope**%0D%0A-%20%5B%5D%20%2F%2FList%20all%20parts%20of%20the%20MVP%20scope%20for%20this%20component%2F%2F%0D%0A%0D%0A**Design**%0D%0A-%20%5B%5D%20Design%20the%20Figma%20spec%20sheet%20and%20add%20a%20link%20to%20it%20in%20this%20task%0D%0A-%20%5B%5D%20Update%20the%20component%20in%20the%20%5BFigma%20library%5D(https%3A%2F%2Fwww.figma.com%2Ffile%2FKoDuJMadWBXtsOtzGS4134%2F%25E2%259D%2596-Codex-components%3Fnode-id%3D1891%253A4420%26viewport%3D287%252C338%252C0.28).%20%2F%2FThis%20step%20will%20be%20done%20by%20a%20DST%20member.%2F%2F%0D%0A%0D%0A**Code**%0D%0A-%20%5B%5D%20Implement%20the%20component%20in%20Codex%0D%0A%0D%0A%23%23%23%20Future%20work%0D%0A%0D%0A-%20%2F%2FIf%20applicable%2C%20list%20future%20work%20that%20should%20be%20done%20for%20this%20component%20after%20the%20MVP%20is%20implemented%20as%20part%20of%20this%20task.%20You%20should%20open%20new%2C%20standalone%20tasks%20for%20all%20future%20work.%2F%2F&projects=Codex