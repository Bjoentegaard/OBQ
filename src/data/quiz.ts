export interface QuizQuestion {
    domain: 'cloud' | 'security' | 'tech' | 'billing'
    question: string
    options: [string, string, string, string]
    answer: 0 | 1 | 2 | 3
    explanation: string
}


export const quizQuestions: QuizQuestion[] = [
    {
        domain: 'cloud',
        question: 'Hvilke av disse er IKKE en av de seks s\u00f8ylene i AWS Well-Architected Framework?',
        options: ['Reliability', 'Performance Efficiency', 'Cost Optimization', 'High Availability'],
        answer: 3,
        explanation: 'High Availability er ikke en s\u00f8yle. De seks er: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization og Sustainability.'
    },
    {
        domain: 'cloud',
        question: 'Hva er hovedfordelen med \u00e5 bruke cloud computing fremfor on-premises infrastruktur?',
        options: ['Alltid lavere totalkostnad', 'Bytte fra CapEx til OpEx og betal kun for det du bruker', 'Garanti om 100% oppetid', 'Ingen behov for sikkerhetstiltak'],
        answer: 1,
        explanation: 'Cloud lar deg bytte fra store kapitalinvesteringer (CapEx) til driftsutgifter (OpEx) med pay-as-you-go-modellen.'
    },
    {
        domain: 'cloud',
        question: 'Hva er en AWS Availability Zone?',
        options: ['Et geografisk omr\u00e5de med flere datasentre', 'En logisk gruppe av AWS-tjenester', 'Et eller flere diskrete datasentre med redundant str\u00f8m og nettverk i en Region', 'En enkelt server i AWS sin infrastruktur'],
        answer: 2,
        explanation: 'En AZ er ett eller flere diskrete datasentre innenfor en Region, med uavhengig str\u00f8m, kj\u00f8ling og nettverk.'
    },
    {
        domain: 'cloud',
        question: 'Hva brukes Amazon CloudFront sine Edge Locations prim\u00e6rt til?',
        options: ['Kj\u00f8re EC2-instanser n\u00e6rmere brukere', 'Cache og levere innhold med lav latens til sluttbrukere', 'Lagre backuper av S3-data', 'H\u00e5ndtere IAM-foresp\u00f8rsler regionalt'],
        answer: 1,
        explanation: 'Edge Locations brukes av CloudFront (CDN) for \u00e5 cache innhold geografisk n\u00e6rmere sluttbrukere og redusere latens.'
    },
    {
        domain: 'cloud',
        question: 'Hva er AWS Outposts?',
        options: ['En tjeneste for \u00e5 migrere on-premises databaser til AWS', 'AWS-infrastruktur installert i kundens eget datasenter for hybrid cloud', 'Et verkt\u00f8y for \u00e5 estimere AWS-kostnader', 'En managed Kubernetes-tjeneste'],
        answer: 1,
        explanation: 'AWS Outposts er fysisk AWS-infrastruktur levert og installert on-premises hos kunden, for applikasjoner som krever lav latens til lokale systemer.'
    },
    {
        domain: 'cloud',
        question: 'Hvilken p\u00e5stand om AWS Regions er KORREKT?',
        options: ['En Region inneholder alltid n\u00f8yaktig to AZer', 'Data replikeres automatisk p\u00e5 tvers av Regions', 'Data forlater aldri en Region uten eksplisitt tillatelse', 'Alle AWS-tjenester er tilgjengelig i alle Regions'],
        answer: 2,
        explanation: 'AWS garanterer at data ikke forlater en Region uten at kunden eksplisitt konfigurerer dette.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS sin del av Shared Responsibility Model?',
        options: ['Sikkerhet av kundenes applikasjoner og data', 'Sikkerhet "of the cloud" \u2013 fysisk infrastruktur, hypervisor, nettverk', 'Konfigurering av sikkerhetsgrupper og NACL', 'Patching av operativsystem p\u00e5 EC2-instanser'],
        answer: 1,
        explanation: 'AWS eier sikkerheten "of the cloud": fysisk infrastruktur, hardware, nettverkskomponenter og hypervisor.'
    },
    {
        domain: 'security',
        question: 'Hvem er ansvarlig for patching av operativsystemet p\u00e5 en EC2-instans?',
        options: ['AWS \u2014 de h\u00e5ndterer all infrastruktur', 'Kunden \u2014 EC2 er IaaS og alt fra OS og opp er kundens ansvar', 'Det deles 50/50 mellom AWS og kunden', 'Amazon Inspector gj\u00f8r dette automatisk'],
        answer: 1,
        explanation: 'EC2 er en IaaS-tjeneste. Kunden er ansvarlig for OS, applikasjoner og data. AWS eier hypervisoren og fysisk hardware.'
    },
    {
        domain: 'security',
        question: 'Hva er hensikten med prinsippet om "least privilege" i IAM?',
        options: ['Gi alle brukere administrator-tilgang for enkel administrasjon', 'Gi kun de tillatelsene som trengs for \u00e5 utf\u00f8re en oppgave', 'Bruke kun managed policies fremfor inline policies', 'Aldri bruke IAM-roller, kun IAM-brukere'],
        answer: 1,
        explanation: 'Least privilege betyr at en bruker, rolle eller tjeneste kun skal ha de tillatelsene som er n\u00f8dvendige \u2014 ikke mer.'
    },
    {
        domain: 'security',
        question: 'Hvilken tjeneste logger alle API-kall gjort i en AWS-konto?',
        options: ['Amazon CloudWatch', 'AWS CloudTrail', 'AWS Config', 'Amazon GuardDuty'],
        answer: 1,
        explanation: 'AWS CloudTrail logger alle API-kall: hvem som kalte hva, n\u00e5r og fra hvilken IP.'
    },
    {
        domain: 'security',
        question: 'Hva er forskjellen p\u00e5 AWS Shield Standard og Advanced?',
        options: ['Standard er kun for CloudFront; Advanced er for alle tjenester', 'Standard gir gratis automatisk DDoS-beskyttelse; Advanced gir utvidet beskyttelse og 24/7 DRT-team mot betaling', 'Standard er betalt; Advanced er gratis for Enterprise-kunder', 'De er identiske men skalerer forskjellig'],
        answer: 1,
        explanation: 'Shield Standard er gratis og automatisk aktivert for alle. Shield Advanced er betalt med forbedret beskyttelse og DDoS Response Team.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS WAF prim\u00e6rt designet for \u00e5 beskytte mot?',
        options: ['DDoS-angrep p\u00e5 nettverksniv\u00e5', 'Uautorisert fysisk tilgang til datasentre', 'Webapplikasjonsangrep som SQL injection og XSS', 'Uautoriserte IAM-endringer'],
        answer: 2,
        explanation: 'AWS WAF (Web Application Firewall) beskytter webapplikasjoner mot Layer 7-angrep som SQL injection og XSS.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS Organizations brukt til?',
        options: ['Organisere EC2-instanser i logiske grupper', 'Sentralisert administrasjon av flere AWS-kontoer med konsolidert fakturering og SCPs', 'Automatisk deployment p\u00e5 tvers av Regions', 'Administrere IAM-brukere p\u00e5 tvers av en enkelt konto'],
        answer: 1,
        explanation: 'AWS Organizations lar deg administrere flere kontoer sentralt med konsolidert fakturering og Service Control Policies (SCPs).'
    },
    {
        domain: 'tech',
        question: 'Hva er den viktigste forskjellen mellom Amazon EC2 og AWS Lambda?',
        options: ['EC2 st\u00f8tter kun Linux; Lambda st\u00f8tter alle OS', 'Lambda er serverless og kj\u00f8res per event; EC2 er virtuelle servere du selv administrerer', 'EC2 er alltid billigere enn Lambda', 'Lambda kan ikke trigges av S3-events'],
        answer: 1,
        explanation: 'EC2 gir deg en virtuell server du administrerer selv (IaaS). Lambda er serverless og faktureres per millisekund ved faktisk kj\u00f8ring.'
    },
    {
        domain: 'tech',
        question: 'Hvilken AWS-tjeneste gir objektlagring med praktisk talt ubegrenset kapasitet?',
        options: ['Amazon EBS', 'Amazon EFS', 'Amazon S3', 'Amazon RDS'],
        answer: 2,
        explanation: 'Amazon S3 er en objektlagringstjeneste uten faste kapasitetsgrenser, egnet for backup, statiske nettsider og datasj\u00f8er.'
    },
    {
        domain: 'tech',
        question: 'Hva er S3 Glacier prim\u00e6rt designet for?',
        options: ['Rask tilgang til hyppig brukte filer', 'Arkivlagring av data som sjelden leses, til lavere kostnad', 'Database-backup med millisekund-gjenoppretting', 'Lagring av EC2-instansens harddisk'],
        answer: 1,
        explanation: 'S3 Glacier er beregnet p\u00e5 langtidsarkivering. Hentingstiden er minutter til timer, men prisen er mye lavere enn S3 Standard.'
    },
    {
        domain: 'tech',
        question: 'Hva gj\u00f8r Amazon RDS sammenlignet med \u00e5 kj\u00f8re en database manuelt p\u00e5 EC2?',
        options: ['RDS st\u00f8tter flere databasemotorer', 'RDS er en managed tjeneste som h\u00e5ndterer patching, backup og failover automatisk', 'RDS gir alltid lavere latens', 'RDS krever ikke IAM-tillatelser'],
        answer: 1,
        explanation: 'RDS er managed \u2013 AWS h\u00e5ndterer OS-patching, automatiske backuper, Multi-AZ failover og vedlikehold.'
    },
    {
        domain: 'tech',
        question: 'Hva er en VPC i AWS?',
        options: ['En virtuell server tilgjengelig i alle Regions', 'Et logisk isolert nettverk der du kontrollerer IP-adresserom, subnett og sikkerhetsgrupper', 'En tjeneste for \u00e5 koble on-premises til AWS', 'En managed brannmur for EC2-instanser'],
        answer: 1,
        explanation: 'En VPC (Virtual Private Cloud) er et logisk isolert nettverk du konfigurerer med eget IP-adresserom, subnett og sikkerhetsgrupper.'
    },
    {
        domain: 'tech',
        question: 'Hva er hensikten med Elastic Load Balancing?',
        options: ['Automatisk skalere antall EC2-instanser', 'Distribuere innkommende trafikk p\u00e5 tvers av instanser for h\u00f8y tilgjengelighet', 'Cache statisk innhold for \u00e5 redusere latens', 'Overv\u00e5ke ytelse og sette alarmer'],
        answer: 1,
        explanation: 'ELB distribuerer innkommende foresp\u00f8rsler automatisk p\u00e5 tvers av EC2-instanser, containere eller IP-adresser.'
    },
    {
        domain: 'tech',
        question: 'Hva er AWS Trusted Advisor?',
        options: ['Et verkt\u00f8y for automatisk deployment', 'Et analyseverkt\u00f8y som gir anbefalinger om kostnader, ytelse, sikkerhet, feiltoleranse og kvoter', 'En tjeneste for \u00e5 opprette IAM-brukere', 'En managed SIEM-l\u00f8sning'],
        answer: 1,
        explanation: 'Trusted Advisor analyserer AWS-milj\u00f8et og gir konkrete anbefalinger innen fem kategorier.'
    },
    {
        domain: 'billing',
        question: 'Hvilken EC2-prismodell gir st\u00f8rst rabatt for forutsigbar, jevn arbeidsbelastning?',
        options: ['On-Demand Instances', 'Spot Instances', 'Reserved Instances', 'Dedicated Hosts'],
        answer: 2,
        explanation: 'Reserved Instances gir opptil 75% rabatt sammenlignet med On-Demand, mot en forpliktelse p\u00e5 1 eller 3 \u00e5r.'
    },
    {
        domain: 'billing',
        question: 'Hva er Spot Instances og n\u00e5r b\u00f8r de IKKE brukes?',
        options: ['Reserverte instanser for langsiktige arbeidsbelastninger', 'Ubrukt EC2-kapasitet til opptil 90% rabatt \u2013 b\u00f8r ikke brukes for kritiske applikasjoner som ikke t\u00e5ler avbrudd', 'Gratis instanser i Free Tier', 'Dedikerte fysiske servere'],
        answer: 1,
        explanation: 'Spot Instances er ubrukt EC2-kapasitet. De kan avsluttes med kun 2 minutters varsel og er uegnet for kritiske applikasjoner.'
    },
    {
        domain: 'billing',
        question: 'Hva er AWS Cost Explorer?',
        options: ['Et verkt\u00f8y for \u00e5 estimere kostnader f\u00f8r du starter', 'Et dashbord for \u00e5 visualisere og analysere faktiske AWS-kostnader over tid', 'En tjeneste for \u00e5 sette automatiske budsjettgrenser', 'En managed faktura-tjeneste'],
        answer: 1,
        explanation: 'Cost Explorer lar deg visualisere, forst\u00e5 og analysere AWS-kostnader og bruk over tid med filter etter tjeneste, tag og Region.'
    },
    {
        domain: 'billing',
        question: 'Hva er konsolidert fakturering i AWS Organizations?',
        options: ['Automatisk fordeling av kostnader mellom avdelinger', 'Alle kontoer samles i \u00e9n faktura, og volumrabatter beregnes p\u00e5 tvers av kontoene', 'Eksport av kostnaddata til regnskapssystemer', 'Sette faktureringsgrenser per konto'],
        answer: 1,
        explanation: 'Med konsolidert fakturering betales \u00e9n felles faktura for alle kontoer, og samlet bruk gir tilgang til volumrabatter.'
    },
    {
        domain: 'billing',
        question: 'Hvilken AWS Support-plan inkluderer en Technical Account Manager (TAM)?',
        options: ['Basic', 'Developer', 'Business', 'Enterprise'],
        answer: 3,
        explanation: 'Enterprise Support er det eneste niv\u00e5et som inkluderer en dedikert TAM som proaktivt hjelper med arkitektur og optimalisering.'
    },
    {
        domain: 'billing',
        question: 'Hva er AWS Free Tier?',
        options: ['Gratis ubegrenset tilgang det f\u00f8rste \u00e5ret', 'Rabattordning for studenter', 'Gratis bruksgrenser: 12-m\u00e5neders tjenester, alltid-gratis tjenester og korttidstilbud', '30 dagers pr\u00f8veperiode uten kredittkort'],
        answer: 2,
        explanation: 'Free Tier inkluderer: tjenester gratis i 12 m\u00e5neder (f.eks. EC2 t2.micro), alltid gratis (f.eks. Lambda 1M requests/mnd), og korttids pr\u00f8vetilbud.'
    },
]