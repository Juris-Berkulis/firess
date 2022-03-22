import React from 'react';

export const HomeUI = (props) => {
    return (
        <div  className={`${props.classes.page__fieldWrapper} ${props.isMobileDeviceBoolean ? props.classes.page__fieldWrapper_mobileDevice : null}`}>
            <div className={`${props.classes.page__field} ${props.isMobileDeviceBoolean ? props.classes.page__field_mobileDevice : null} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.page__field_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.page__field_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.page__field_sunnyTheme : null) : null}`}>
                <div className={props.classes.home__appNameWrapper}>
                    <h1 className={`${props.classes.home__appName} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.home__appName_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.home__appName_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.home__appName_sunnyTheme : null) : null}`}>&#8497;i&#769;r&#949;ss &#8499;&#949;ss&#949;ng&#949;r</h1>
                </div>
                <div className={props.classes.home__appDescriptionWrapper}>
                    <p className={props.classes.home__descriptionParagraph}>Firess - легковесное, лаконичное, быстрое и полностью бесплатное приложение с отзывчивым дизайном, доступное и как web-сайт, и как отдельное приложение для смартфонов и компьютеров, и предназначенное для обмена текстовыми сообщениями между пользователями со всего мира.</p>
                    <p className={props.classes.home__descriptionParagraph}>Firess использует подключение вашего устройства к Интернету (4G/3G/2G/EDGE, домашний интернет или Wi-Fi, если он доступен) для обмена сообщениями. Перейдите с SMS на Firess и обменивайтесь текстовыми сообщениями абсолютно бесплатно, не тратя денег на SMS, - нужен лишь включенный Интернет.</p>
                    <p className={props.classes.home__descriptionParagraph}>Создавайте чаты с неограниченным количеством участников! Бесплатный мессенджер Firess позволяет легко создавать и вступать в групповые чаты, будь то чат с родителями, чаты с друзьями или с вовсе незнакомыми Вам людьми из других городов и стран.</p>
                    <p className={props.classes.home__descriptionParagraph}>В Firess пользователи могут общаться друг с другом, создавая публичные чаты, которые доступны всем пользователям, и приватные чаты, доступные только группе пользователей. В публичные чаты могут заходить другие пользователи и полноценно общаться друг с другом, в приватных чатах могут общаться лишь пользователи, имеющие к ним доступ. Помимо этого, в Firess есть возможность создавать неограниченное количество чатов с самим собой.</p>
                    <h3 className={props.classes.home__descriptionTitle}>ПОЧЕМУ FIRESS:</h3>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>МАЛЫЙ РАЗМЕР. </span>Благодаря своему крохотному размеру, который намного меньше 1МБ (размер приложения Firess в тысячи раз меньше остальных популярных мессенджеров), Firess является отличным дополнением к арсеналу приложений на Вашем устройстве. У Вас даже получится установить его на смартфон, на который любые другие мессенджеры уже не скачать из-за недостатка места.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>УДОБСТВО. </span>Бесплатно переписываться с пользователями со всего мира одинаково удобно:</p>
                        <ul className={props.classes.home__benefitsList}>
                            <li className={props.classes.home__benefitsListItem}>компьютер / смартфон;</li>
                            <li className={props.classes.home__benefitsListItem}>web-сайт / приложение Firess;</li>
                            <li className={props.classes.home__benefitsListItem}>ландшафтный / портретный режимы.</li>
                        </ul>
                        <p className={props.classes.home__benefitsParagraph}>В Firess отправлять и получать сообщения Вы можете как на сайте прямо в браузере своего смартфона или компьютера, так и через приложение, доступное к установке и на смартфоны, и на компьютеры.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>СКОРОСТЬ. </span>Мгновенная доставка сообщений.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>СИНХРОНИЗАЦИЯ. </span>Отправлять и получать сообщения, просматривать историю переписки и пользоваться всем остальным функционалом Firess можно с нескольких устройств одновременно, включая компьютеры, планшеты и смартфоны. Все данные останутся с Вами, даже если Вы купите новый смартфон или потеряете старый.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>ОТСУТСТВИЕ ОГРАНИЧЕНИЙ. </span>Вся история переписки хранится на сервере и не занимает почти никакого места на Ваших устройствах.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>ШИРОКИЕ ВОЗМОЖНОСТИ. </span>Каждая группа в чатах Firess может вмещать неограниченное количество участников. Firess идеально подходит для создания личной переписки, онлайн-форума, онлайн-сообществ по интересам и организации рабочих процессов.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>НАДЁЖНОСТЬ. </span>Вы сможете отправлять и получать сообщения даже на самых слабых соединениях.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>ПРОСТОТА. </span>Приложение Firess - простое и понятное. Благодаря минималистичному дизайну освоить Firess легко, независимо от уровня Вашей технической грамотности.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>БЕСПЛАТНЫЙ СЕРВИС. </span>Приложение Firess полностью бесплатно, без каких-либо платных подписок и назойливой рекламы. Firess использует подключение вашего устройства к Интернету (4G/3G/2G/EDGE, домашний интернет или Wi-Fi, если он доступен) для обмена сообщениями, поэтому вам не нужно оплачивать каждое новое сообщение.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>БЕЗ МЕЖДУНАРОДНЫХ ТАРИФОВ. </span>Firess не берёт дополнительную плату за отправку сообщений за рубеж. Общайтесь с людьми по всему миру и не переплачивайте за международные SMS. Все сообщения в Firess абсолютно бесплатны.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>СПОКОЙСТВИЕ. </span>Вам никогда напрямую не напишут посторонние люди с целью навязывания своих услуг, продвижения своих продуктов, вымогания денег и прочими предложениями - ведь Вы общаетесь в чатах, которые посещаете сами по своему желанию.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>ГРУППОВЫЕ ЧАТЫ. </span>Групповые чаты помогают вам с лёгкостью оставаться на связи как с друзьями и родственниками, так и с вовсе незнакомыми Вам людьми, у которых схожие с Вами интересы.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>ЧАТЫ БЕЗ ОГРАНИЕЧЕНИЙ. </span>Зачем ограничиваться одним чатом с другом или любым другим человеком? В Firess Вы можете создать неограниченное количество чатов с каждым человеком, группой людей, а также с самим собой. Это удобно, например, если Вы хотите, чтобы диалог не выглядел одной сплошной лентой. Вы можете создать с собеседником или группой собеседников несколько чатов, разделенных, например, по тематике,</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>НЕ ОСТАВЛЯЙТЕ СЛЕДОВ В СЕТИ. </span>В случае, если Вы не хотите, чтобы сообщения оставались в сети Интернет или Вы отправляете секретные данные, которые не должны попасть третьим лицам, или же Вы просто боитесь, что диалог может прочитать кто-то другой, тогда Вы можете создать с собеседником или с группой собеседников отдельный чат и удалить его после общения. При удалении чата вместе с ним со всех устройств всех участников чата и со всех серверов безвозвратно удаляются все сообщения этого чата, таким образом нигде не остается вообще никаких следов переписки.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>СОХРАНЕНИЕ СООБЩЕНИЙ, ПОКА ВЫ НЕ В СЕТИ. </span>Даже если Вы закроете сайт, выключите приложение или полностью выключите смартфон, Firess доставит сообщения, когда Вы снова откроете приложение или зайдете на сайт.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>НЕОГРАНИЧЕННАЯ ДЛИНА СООБЩЕНИЙ. </span>Делитесь длинными сообщениями и печатными произведениями, не задумываясь об ограничении символов и о формате отображаемого текста.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>ОФОРМЛЕНИЕ ТЕКСТА. </span>Ваш собеседник ничего не пропустит. В Firess всем пользователям доступен специальный синтаксис для оформления текста. Выделяйте в сообщениях особо важные слова, предложения и абзацы. Варианты оформления: курсив, жирный, подчеркнутый, зачеркнутый, с фоном и любые комбинации перечисленных вариантов, а также - отделение абзацев друг от друга при помощи увеличенного отступа.</p>
                    </div>
                    <div className={props.classes.home__benefitsWrapper}>
                        <p className={props.classes.home__benefitsParagraph}><span className={props.classes.home__benefitName}>КОМФОРТ. </span>Ваши глаза не устанут и не будут болеть. В Firess существует несколько тем, переключающихся автоматически в зависимости от времени суток.</p>
                    </div>
                    <h3 className={props.classes.home__descriptionTitle}>ФУНКЦИОНАЛ ПРИЛОЖЕНИЯ:</h3>
                    <ul className={props.classes.home__benefitsList}>
                        <li className={props.classes.home__benefitsListItem}>создание публичных, приватных и индивидуальных чатов;</li>
                        <li className={props.classes.home__benefitsListItem}>удаление собственных чатов и всех сообщений в них со всех устройств;</li>
                        <li className={props.classes.home__benefitsListItem}>перевод своих публичных чатов в приватные и обратно;</li>
                        <li className={props.classes.home__benefitsListItem}>добавление любимых чатов в избранные;</li>
                        <li className={props.classes.home__benefitsListItem}>отправка и получение сообщений в реальном времени;</li>
                        <li className={props.classes.home__benefitsListItem}>специальный синтаксис для выделения пользователями важных фрагментов текста в отправляемых сообщениях;</li>
                        <li className={props.classes.home__benefitsListItem}>автоматическая смена нескольких тем приложения в зависимости от времени суток;</li>
                        <li className={props.classes.home__benefitsListItem}>прочий функционал.</li>
                    </ul>
                    <p className={props.classes.home__descriptionParagraph}>Благодаря децентрализации приложения, в случае закрытия основного сайта по каким-либо причинам (например, из-за санкций), Вы сможете продолжить общение на запасных сайтах Firess. Все данные сохранятся.</p>
                    <h3 className={props.classes.home__descriptionTitle}>СИНТАКСИС ОФОРМЛЕНИЯ ТЕКСТА В СООБЩЕНИЯХ</h3>
                    <p className={props.classes.home__descriptionParagraph}>Для выделения фрагмента текста в сообщении в начале и в конце выделяемого фрагмента поставьте специальные символы:</p>
                    <ul className={props.classes.home__benefitsList}>
                        <li className={props.classes.home__benefitsListItem}>*,, и ,,* - для выделения <strong>жирным</strong> шрифтом</li>
                        <li className={props.classes.home__benefitsListItem}>/,, и ,,/ - для выделения <em>курсивным</em> шрифтом</li>
                        <li className={props.classes.home__benefitsListItem}>_,, и ,,_ - для выделения <ins>подчеркнутым</ins> шрифтом</li>
                        <li className={props.classes.home__benefitsListItem}>-,, и ,,- - для выделения <s>зачеркнутым</s> шрифтом</li>
                        <li className={props.classes.home__benefitsListItem}>+,, и ,,+ - для выделения текста <mark style={{backgroundColor: '#cccccc'}}>фоном</mark></li>
                        <li className={props.classes.home__benefitsListItem}>=,, и ,,= - для написания текста с новой строки</li>
                        <li className={props.classes.home__benefitsListItem}>(,, и ,,) - для отделения абзацев друг от друга</li>
                    </ul>
                    <p className={props.classes.home__descriptionParagraph}>Для комбинированного оформления фрагментов текста рекомендуется ставить пробел между текстовыделителями.</p>
                    <h4 className={props.classes.home__descriptionMiniTitle}>Пример:</h4>
                    <p className={props.classes.home__descriptionParagraph}>(,,Открывающаяся скобка показывает, что начался абзац, а закрывающая - что абзац закончился.,,)(,,Поэтому здесь начнется второй абзац, а текст пойдет со следующей строки и с дополнительным вертикальным отступом.,,)(,,В третьем абзаце выделим текст /,,курсивом,,/, *,,жирным,,*, _,,подчеркнутым,,_, -,,зачеркнутым,,- шрифтом и +,,фоном,,+.,,)(,,В четвертом абзаце применим *,, _,,комбинации,,_ ,,* +,, /,,разных,,/ -,, *,,вариантов,,* ,,- _,,оформления,,_ текста,,+.,,)(,,В пятом абзаце напишем текст с новой строки. =,,При этом новая строка начнется без дополнительного вертикального отступа.,,= ,,)</p>
                    <h4 className={props.classes.home__descriptionMiniTitle}>Результат:</h4>
                    <div className={props.classes.home__descriptionParagraphWrapper}><p style={{margin: '1vh 0'}}>Открывающаяся скобка показывает, что начался абзац, а закрывающая - что абзац закончился.</p><p style={{margin: '1vh 0'}}>Поэтому здесь начнется второй абзац, а текст пойдет со следующей строки и с дополнительным вертикальным отступом.</p><p style={{margin: '1vh 0'}}>В третьем абзаце выделим текст <em>курсивом</em>, <strong>жирным</strong>, <ins>подчеркнутым</ins>, <s>зачеркнутым</s> шрифтом и <mark style={{backgroundColor: '#cccccc'}}>фоном</mark>.</p><p style={{margin: '1vh 0'}}>В четвертом абзаце применим <strong> <ins>комбинации</ins> </strong> <mark style={{backgroundColor: '#cccccc'}}> <em>разных</em> <s> <strong>вариантов</strong> </s> <ins>оформления</ins> текста</mark>.</p><p style={{margin: '1vh 0'}}>В пятом абзаце напишем текст с новой строки. <br/>При этом новая строка начнется без дополнительного вертикального отступа.</p></div>
                </div>
                <div className={props.classes.home__logoWrapper}>
                    <img className={props.classes.home__logoImg} src={props.logoEnvelope} alt='logo' height='50px' />
                    <img className={props.classes.home__logoImg} src={props.logoRectangle} alt='logo' height='50px' />
                    <img className={props.classes.home__logoImg} src={props.logoCircle} alt='logo' height='50px' />
                </div>
            </div>
        </div>
    )
};
