# Contributing

We welcome contributions from everyone! There are several ways to contribute, including the following.

- Adding or commenting on tasks in our project management system, [Phabricator](https://phabricator.wikimedia.org/tag/codex/).
- Contributing to the design process.
- Suggesting new components and design tokens.
- Writing and submitting code.
- Reviewing code.
- Updating and expanding library documentation.
- Providing support to others using Codex.

For technical decisions about the library, refer to the [Architecture Decision Records (ADRs) section](../using-codex/adrs/overview).

::: info
Contributions to Codex are covered by the [Code of Conduct for Wikimedia technical spaces](https://www.mediawiki.org/wiki/Special:MyLanguage/Code_of_Conduct).
:::

## Resources

- [**Figma**](https://www.figma.com/community/file/1448742124788019850/codex): design with Codex components in Figma.
- [**MediaWiki**](https://www.mediawiki.org/wiki/Codex): learn about using Codex within MediaWiki.
- [**Gerrit**](https://gerrit.wikimedia.org/r/admin/repos/design/codex): visit the canonical Codex codebase.
- [**GitHub**](https://github.com/wikimedia/design-codex): visit a mirror of the Gerrit codebase on GitHub.

## Task tracking

Tasks are tracked in Phabricator on the [**Codex Phabricator workboard**](https://phabricator.wikimedia.org/tag/codex/).

Within this board, filters are used to organize tasks into categories, including but not limited to:

- [**Good first tasks**](https://phabricator.wikimedia.org/project/board/5587/?filter=c9UOyCZr719w): tasks that are good starting points for new contributors.
- [**New components**](https://phabricator.wikimedia.org/project/board/5587/?filter=a44lKJ_qnMtz): tasks relating to the addition of new components in Codex.
- [**Bugs**](https://phabricator.wikimedia.org/project/board/5587/?filter=O6HKiEI.xB_F): tasks that have reported a bug in Codex.
- [**Accessibility tasks**](https://phabricator.wikimedia.org/project/board/5587/?filter=MLMTMPqdLxbb): tasks to improve accessibility in Codex.
- [**Design tasks**](https://phabricator.wikimedia.org/project/board/5587/?filter=C_Ge5L58Ujv7): tasks that are design oriented.

## FAQ

### What if I have a question about something related to Codex?

Please [get in touch](../using-codex/contact.md) with us.

### What is the status of something Codex related?

The status of a particular task can be found on the [**Codex**](https://phabricator.wikimedia.org/tag/codex/) Phabricator workboard. If a task exists, the task will be in the column that represents its current status. If not, you can create a task (see below) or [get in touch](../using-codex/contact.md) with us.

### Can I request a feature?

You are welcome to create new tasks on the [**Codex**](https://phabricator.wikimedia.org/tag/codex/) Phabricator workboard. New tasks will go into our "Inbox" column and will be triaged regularly. Please remember
that Codex is maintained by a nonprofit—we won't be able to meet all feature requests, and it might
take time to get to your request.

Please use the Phabricator templates for each type of request:

- [New token][token-creation-task-template]
- [New icon][icon-creation-phab-template]
- [New component][new-component-phab-template]

### How can I track Codex tasks?

[Create a Phabricator account](https://www.mediawiki.org/wiki/Phabricator/Help#Creating_your_account)
and [add yourself as a subscriber](https://www.mediawiki.org/wiki/Phabricator/Help#Receiving_updates_and_notifications) to a task to get notified when updates are made.

### How can I contribute to a task?

Create or claim a task as soon as you decide to work on it. This will help avoid overlapping,
duplicate, or conflicting work. If you're creating a task, add as much detail as you can about the
scope of the task: for example, what needs to be completed before the task can be considered "done"?

[new-component-phab-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BComponentName%5D%3A%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0A%2F%2FNOTE%3A%20%20When%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A%23%23%23%20Description%0D%0A%0D%0A%2F%2FAdd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2FAdd%20at%20least%20one%20user%20story.%2F%2F%0D%0A%0D%0A%23%23%23%20History%0D%0A%0D%0A%2F%2FDescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20Known%20use%20cases%0D%0A%0D%0A%2F%2FDescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A%0D%0A%23%23%23%20Existing%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20figma%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A**Wikimedia%20community%3A**%0D%0A-%20**Design%20style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdesign.wikimedia.org%2Fstyle-guide%2Findex.html%20%7C%20Design%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name(s)%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fwww.mediawiki.org%2Fwiki%2FVue.js%23Projects_using_Vue.js%20%7C%20Projects%20using%20Vue.js%20%5D%5D.%2F%2F%0D%0A%0D%0A**External%20libraries%3A**%0D%0A-%20%2F%2FAdd%20links%20to%20any%20examples%20from%20external%20libraries%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer's%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer's%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%0D%0A-%20%2F%2FList%20any%20current%20open%20questions%20here%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0AA%20component%20spec%20sheet%20has%20not%20been%20created%20yet.%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A%23%23%23%23%20Anatomy%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20structure%20and%20properties%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Style%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20visual%20features%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Interaction%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20interaction%20specifications.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Documentation%0D%0A%0D%0A%2F%2FDesigner%20should%20describe%20how%20the%20component%20should%20be%20documented%2C%20including%20configurable%20and%20standalone%20demos.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Acceptance%20criteria%0D%0A%0D%0A%23%23%23%20Minimum%20viable%20product%0D%0A%0D%0AThis%20task%20covers%20the%20minimum%20viable%20product%20(MVP)%20version%20of%20this%20component.%20MVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A**MVP%20scope**%0D%0A-%20%5B%5D%20%2F%2FList%20all%20parts%20of%20the%20MVP%20scope%20for%20this%20component%2F%2F%0D%0A%0D%0A**Design**%0D%0A-%20%5B%5D%20Design%20the%20Figma%20spec%20sheet%20and%20add%20a%20link%20to%20it%20in%20this%20task%0D%0A-%20%5B%5D%20Update%20the%20component%20in%20the%20%5BFigma%20library%5D(https%3A%2F%2Fwww.figma.com%2Ffile%2FKoDuJMadWBXtsOtzGS4134%2F%25E2%259D%2596-Codex-components%3Fnode-id%3D1891%253A4420%26viewport%3D287%252C338%252C0.28).%20%2F%2FThis%20step%20will%20be%20done%20by%20a%20DST%20member.%2F%2F%0D%0A%0D%0A**Code**%0D%0A-%20%5B%5D%20Implement%20the%20component%20in%20Codex%0D%0A%0D%0A%23%23%23%20Future%20work%0D%0A%0D%0A-%20%2F%2FIf%20applicable%2C%20list%20future%20work%20that%20should%20be%20done%20for%20this%20component%20after%20the%20MVP%20is%20implemented%20as%20part%20of%20this%20task.%20You%20should%20open%20new%2C%20standalone%20tasks%20for%20all%20future%20work.%2F%2F&projects=Codex

[token-creation-task-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Add%20new%20%5BName%5D%20token%20in%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20token%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20token%2F%2F%0D%0A-%20**History**%20(if%20needed)**%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20token%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20token%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%2F%2F%20Once%20the%20design%20spec%20has%20been%20created%2C%20remove%20this%20note%20and%20add%20the%20link%20to%20the%20design%20spec.%20%2F%2F%0D%0A%0D%0A%7C%20Design%20spec%20link%20%7C%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%2F%2F%20Add%20here%20the%20questions%20to%20be%20answered%20in%20order%20to%20design%20and%20implement%20the%20token%20%2F%2F%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%20(or%20Done)%0D%0A%0D%0A**Design**%0D%0A%5B%5D%20Design%20the%20token's%20specification%20and%20add%20it%20to%20this%20task%0D%0A%5B%5D%20Add%20the%20token%20as%20Figma%20style%2Fvariable%20in%20the%20%5B%5B%20https%3A%2F%2Fwww.figma.com%2Ffile%2FmRvSsFD2Kwh8AZNjlx7rIl%2F%25E2%259C%25A8-Design-Tokens-%255BWIP%255D%3Fnode-id%3D0%253A1%26viewport%3D486%252C353%252C0.25%20%7C%20library%20%5D%5D.%0D%0A%0D%0A**Code**%0D%0A%5B%5D%20Implement%20the%20token%20in%20Codex%0D%0A%5B%5D%20Update%20components%20that%20use%20this%20token%20(if%20needed)&projects=Codex

[icon-creation-phab-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BIconName%5D%3A%20Add%20%5BIconName%5D%20icon%20to%20Codex%20and%20OOUI&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A%20%20%20%20-%20**Description%3A**%20provide%20context%20about%20usage%20of%20the%20new%20icon%0D%0A%20%20%20%20-%20**History%3A**%20describe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20icon%0D%0A%20%20%20%20-%20**Known%20use%20case(s)%3A**%20describe%20known%20use%20cases%20for%20this%20icon%2C%20including%20the%20project%20and%20team%20where%20you%20will%20use%20this%20icon%20(and%20timeline%20if%20needed)%0D%0A%20%20%20%20-%20**Considerations%3A**%20list%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2FAdd%20at%20least%20one%20user%20story%20in%20the%20task%2F%2F%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%0D%0A%2F%2F%20Add%20here%20the%20questions%20to%20be%20answered%20in%20order%20to%20design%20and%20implement%20the%20component%20%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20proposal%0D%0A%0D%0A%2F%2FOnce%20the%20icon%20proposal%20has%20been%20defined%2C%20it%20will%20be%20explained%20in%20this%20section%2C%20so%20any%20user%20can%20easily%20find%20and%20understand%20it.%2F%2F%0D%0A%0D%0A%23%23%23%20SVG%20icon%0D%0A%0D%0A%2F%2FOnce%20the%20icon%20has%20been%20created%2C%20we%20will%20export%20it%20in%20SVG%20format%20and%20add%20it%20here.%2F%2F%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%20for%20Done%0D%0A%0D%0A**Design**%0D%0A%20%0D%0A%5B%20%5D%20%20The%20design%20of%20the%20new%20icon%20is%20ready%2C%20and%20it%20follows%20the%20%5Bicon%20guidelines%5D(https%3A%2F%2Fdoc.wikimedia.org%2Fcodex%2Flatest%2Fstyle-guide%2Ficons.html)%0D%0A%20%20%20%5B%20%5D%20%20An%20RTL%20icon%20has%20been%20created%20%2F%2F(if%20needed)%2F%2F%0D%0A%20%20%20%5B%20%5D%20%20The%20icon%20is%20recognizable%20on%20low%20DPI%20resolutions%0D%0A%20%20%20%5B%20%5D%20%20The%20icon%20has%20been%20exported%20as%20an%20optimized%20SVG%20and%20added%20to%20this%20task%E2%80%99s%20description%0D%0A%20%20%20%5B%20%5D%20%20The%20new%20icon%20has%20been%20included%20and%20published%20in%20the%20%5BCodex%20Figma%20library%5D(https%3A%2F%2Fwww.figma.com%2Fdesign%2FKoDuJMadWBXtsOtzGS4134%2FCodex%3Fnode-id%3D20598-51339%26t%3DCLcY4nY3roYuHgVq-11)%0D%0A%20%20%20%20%0D%0A**Code**%0D%0A%0D%0A%5B%20%5D%20%20Add%20icon%20in%20Codex%0D%0A%5B%20%5D%20%20Add%20icon%20in%20OOUI%0D%0A%0D%0A%0D%0A**Documentation**%0D%0A%5B%20%5D%20Update%20%7BT141801%7D&projects=Codex%2C%20OOUI