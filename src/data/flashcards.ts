export interface Flashcard {
    domain: 'cloud' | 'security' | 'tech' | 'billing'
    question: string
    answer: string
}

export type Flashcards = Flashcard

export const flashcards: Flashcard[] = [
    {
        domain: 'cloud',
        question: 'Hva er de seks søylene i AWS Well-Architected Framework?',
        answer: 'Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, og Sustainability.'
    },
    {
        domain: 'cloud',
        question: 'Hva er en AWS Region?',
        answer: 'Et geografisk område med to eller flere Availability Zones (AZer). Data forlater aldri en Region uten eksplisitt tillatelse.'
    },
    {
        domain: 'cloud',
        question: 'Hva er en Availability Zone (AZ)?',
        answer: 'Et eller flere diskrete datasenter i en Region, med redundant strøm, nettverk og tilkobling. AZer er fysisk separert fra hverandre.'
    },
    {
        domain: 'cloud',
        question: 'Hva er forskjellen på CapEx og OpEx i skysammenheng?',
        answer: 'CapEx = kapitalutgift (investering i fysisk infrastruktur). OpEx = driftsutgift (betal kun for det du bruker). Sky = primært OpEx-modell.'
    },
    {
        domain: 'cloud',
        question: 'Nevn de fem karakteristikkene til cloud computing (NIST-definisjon).',
        answer: 'On-demand self-service, broad network access, resource pooling, rapid elasticity, og measured service.'
    },
    {
        domain: 'cloud',
        question: 'Hva betyr "elastisitet" i AWS-sammenheng?',
        answer: 'Evnen til automatisk å skalere ressurser opp og ned basert på etterspørsel, slik at du kun betaler for det du faktisk bruker.'
    },
    {
        domain: 'cloud',
        question: 'Hva er Edge Locations brukt til?',
        answer: 'Edge Locations brukes av Amazon CloudFront (CDN) for å cache innhold nærmere sluttbrukere og redusere latens.'
    },
    {
        domain: 'cloud',
        question: 'Hva er AWS Local Zones?',
        answer: 'Utvidelser av AWS Regions plassert nærmere store bysentre for applikasjoner som krever lavere latens enn en Region kan gi.'
    },
    {
        domain: 'cloud',
        question: 'Hva er forskjellen på High Availability og Fault Tolerance?',
        answer: 'High Availability = minimal nedetid ved feil. Fault Tolerance = ingen avbrudd i det hele tatt, systemet fortsetter som normalt selv ved komponentfeil.'
    },
    {
        domain: 'cloud',
        question: 'Hva er AWS Outposts?',
        answer: 'AWS-infrastruktur installert on-premises i kundens eget datasenter, for hybrid cloud-arkitektur med lav latens til lokale systemer.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS Shared Responsibility Model?',
        answer: 'AWS er ansvarlig for sikkerheten "of the cloud" (infrastruktur), kunden er ansvarlig for sikkerheten "in the cloud" (data, tilganger, konfigurasjon).'
    },
    {
        domain: 'security',
        question: 'Hvem eier sikkerheten for EC2-operativsystemet og applikasjoner?',
        answer: 'Kunden. AWS eier hypervisor-laget og fysisk infrastruktur. Alt fra OS og opp er kundens ansvar ved IaaS.'
    },
    {
        domain: 'security',
        question: 'Hva er IAM, og hva brukes det til?',
        answer: 'Identity and Access Management – kontrollerer hvem som kan gjøre hva i AWS-kontoen. Styrer brukere, grupper, roller og policyer.'
    },
    {
        domain: 'security',
        question: 'Hva er en IAM Policy?',
        answer: 'Et JSON-dokument som definerer tillatelser (Allow/Deny) for AWS-ressurser. Kan knyttes til brukere, grupper eller roller.'
    },
    {
        domain: 'security',
        question: 'Hva er prinsippet om least privilege i IAM?',
        answer: 'Gi kun de tillatelsene som er nødvendige for å utføre en oppgave — ikke mer. Reduserer angrepsflaten ved kompromittering.'
    },
    {
        domain: 'security',
        question: 'Hva er MFA og hvorfor anbefales det for root-kontoen?',
        answer: 'Multi-Factor Authentication krever noe du vet (passord) + noe du har (token/app). Root-kontoen har full tilgang til alt – ekstra kritisk å beskytte.'
    },
    {
        domain: 'security',
        question: 'Hva gjør Amazon GuardDuty?',
        answer: 'En threat detection-tjeneste som overvåker AWS-kontoen for ondsinnede aktiviteter ved å analysere CloudTrail, VPC Flow Logs og DNS-logger.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS CloudTrail?',
        answer: 'Logger alle API-kall gjort i AWS-kontoen (hvem, hva, når, hvor). Brukes til audit, compliance og feilsøking.'
    },
    {
        domain: 'security',
        question: 'Hva er forskjellen på AWS Shield Standard og Advanced?',
        answer: 'Standard: automatisk DDoS-beskyttelse, gratis for alle. Advanced: forbedret beskyttelse, 24/7 DRT-team, kostnadsabsorbering – betalt tilleggstjeneste.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS WAF?',
        answer: 'Web Application Firewall som beskytter webapplikasjoner mot vanlige angrep som SQL injection og XSS. Brukes foran CloudFront, ALB eller API Gateway.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS Organizations?',
        answer: 'Sentralisert administrasjon av flere AWS-kontoer. Muliggjør konsolidert fakturering og policystyring (SCPs) på tvers av kontoer.'
    },
    {
        domain: 'security',
        question: 'Hva er AWS Artifact?',
        answer: 'En portal for å laste ned AWS compliance-rapporter (f.eks. SOC, ISO, PCI DSS) og inngå juridiske avtaler med AWS.'
    },
    {
        domain: 'tech',
        question: 'Hva er Amazon EC2?',
        answer: 'Elastic Compute Cloud – virtuelle servere i skyen. Du velger instanstype, OS og betaler per sekund/time. IaaS-tjeneste.'
    },
    {
        domain: 'tech',
        question: 'Hva er AWS Lambda?',
        answer: 'Serverless compute – kjør kode uten å administrere servere. Betaler kun for faktisk kjøretid (per millisekund). Trigges av events.'
    },
    {
        domain: 'tech',
        question: 'Hva er Amazon S3?',
        answer: 'Simple Storage Service – objektlagring med praktisk talt ubegrenset kapasitet. Brukes til backup, statiske nettsider, datasjøer og mer.'
    },
    {
        domain: 'tech',
        question: 'Hva er forskjellen på S3 Standard og S3 Glacier?',
        answer: 'S3 Standard: hyppig tilgang, lav latens. S3 Glacier: arkivlagring for data som sjelden leses – mye billigere, men minutter til timer i hentingstid.'
    },
    {
        domain: 'tech',
        question: 'Hva er Amazon RDS?',
        answer: 'Relational Database Service – administrert databasetjeneste for SQL-databaser (MySQL, PostgreSQL, Oracle m.fl.). AWS håndterer patching, backup og failover.'
    },
    {
        domain: 'tech',
        question: 'Hva er Amazon DynamoDB?',
        answer: 'Fullstendig administrert NoSQL-database med nær-null latens. Skalerbar, serverless, og egnet for applikasjoner med uforutsigbar trafikk.'
    },
    {
        domain: 'tech',
        question: 'Hva er en VPC?',
        answer: 'Virtual Private Cloud – et logisk isolert nettverk i AWS der du kan kjøre ressurser. Du kontrollerer IP-adresserom, subnett, rutere og sikkerhetsgrupper.'
    },
    {
        domain: 'tech',
        question: 'Hva er Amazon CloudFront?',
        answer: 'AWS sitt CDN (Content Delivery Network). Distribuerer innhold via Edge Locations globalt for rask levering og lav latens til sluttbrukere.'
    },
    {
        domain: 'tech',
        question: 'Hva er Elastic Load Balancing (ELB)?',
        answer: 'Distribuerer innkommende trafikk automatisk på tvers av flere EC2-instanser, containere eller IP-adresser for høy tilgjengelighet.'
    },
    {
        domain: 'tech',
        question: 'Hva er Auto Scaling?',
        answer: 'Justerer automatisk antall EC2-instanser opp eller ned basert på definerte regler (f.eks. CPU-bruk). Sikrer kapasitet og kostnadskontroll.'
    },
    {
        domain: 'tech',
        question: 'Hva er Amazon Route 53?',
        answer: 'AWS sitt DNS-tjeneste og domeneregistrar. Kan rute trafikk basert på latens, geolokasjon, helse-sjekker m.m.'
    },
    {
        domain: 'tech',
        question: 'Hva er AWS Trusted Advisor?',
        answer: 'Analyserer AWS-miljøet og gir anbefalinger innen fem kategorier: kostnadsoptimalisering, ytelse, sikkerhet, feiltoleranse og tjenestekvoter.'
    },
    {
        domain: 'billing',
        question: 'Hva er de tre prismodellene for EC2?',
        answer: 'On-Demand (betal per time/sekund, ingen binding), Reserved Instances (1- eller 3-årsforpliktelse, opptil 75% rabatt), Spot Instances (ubrukt kapasitet, opptil 90% billigere, kan avsluttes med 2 min varsel).'
    },
    {
        domain: 'billing',
        question: 'Hva er AWS Free Tier?',
        answer: 'Gratis bruksgrenser for nye AWS-kontoer: noen tjenester er gratis i 12 måneder, noen alltid gratis (f.eks. Lambda: 1M requests/mnd), noen er korttids prøvetilbud.'
    },
    {
        domain: 'billing',
        question: 'Hva er AWS Cost Explorer?',
        answer: 'Visualiserer og analyserer AWS-kostnader over tid. Gir mulighet til å filtrere etter tjeneste, konto, tag m.m., og kan gi kostnadsanslag.'
    },
    {
        domain: 'billing',
        question: 'Hva er AWS Budgets?',
        answer: 'Sett budsjettgrenser for kostnader og bruk. Send varsler (e-post/SNS) når faktisk eller anslått bruk overskrider terskelen.'
    },
    {
        domain: 'billing',
        question: 'Hva er konsolidert fakturering i AWS Organizations?',
        answer: 'Alle kontoer i en organisasjon samles i én faktura. Muliggjør volumrabatter på tvers av kontoer (f.eks. S3 og EC2 rabatt-terskler).'
    },
    {
        domain: 'billing',
        question: 'Hva er de fire AWS Support-planene, og hva skiller dem?',
        answer: 'Basic (gratis), Developer (business-hours), Business (24/7, SLA 1t critical), Enterprise (TAM-tildeling, SLA 15min critical). Pris og responstid øker oppover.'
    },
]
