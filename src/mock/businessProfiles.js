import { v4 as uuid } from "uuid"



const businessProfiles = [
    {
        id: uuid(),
        name: 'Administration Communale de la Ville de Luxembourg',
        address: '42, Place Guillaume II, L-1648 Luxembourg',
        coordinates: [6.130489, 49.610269],
        email: 'contact@vdl.lu',
        phone: '+352 47 961',
        website: 'https://www.vdl.lu/',
        image: '/images/business-profile/10.jpeg',
        planning: {
            monday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
            tuesday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
            wednesday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
            thursday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
            friday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
            saturday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
            sunday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '13:30',
                eveningTo: '17:00',
            },
        }
    },
    {
        id: uuid(),
        name: 'Waassertuerm Pomhouse (Musée)',
        address: '1, Rue du Centenaire, L-3475 Dudelange',
        coordinates: [6.082642763049468, 49.47473130876126],
        email: 'info@cna.etat.lu',
        phone: '+352 52 24 24 507',
        website: 'https://cna.public.lu/',
        image: '/images/business-profile/11.jpeg',
        planning: {
            monday: {
                active: true,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            tuesday: {
                active: false,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            wednesday: {
                active: true,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            thursday: {
                active: true,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            friday: {
                active: true,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            saturday: {
                active: false,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            sunday: {
                active: false,
                morningFrom: '12:00',
                morningTo: '18:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
        }
    },
    {
        id: uuid(),
        name: 'Schloss Aspelt',
        address: '37, Péiter vun Uespelt-Strooss, L-5710 Aspelt',
        coordinates: [6.2229912126167966, 49.52775353922813],
        email: 'info@amisduchateau-aspelt.lu',
        phone: '+352 2754 1',
        website: '',
        image: '/images/business-profile/12.jpeg',
        planning: {
            monday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            tuesday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            wednesday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            thursday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            friday: {
                active: true,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            saturday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            sunday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '12:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
        }
    },
    {
        id: uuid(),
        name: 'Kinneksbond',
        address: "42, Route d'Arlon, L-8210 Mamer",
        coordinates: [6.030902327500089, 49.62872107009215],
        email: 'info@kinneksbond.lu',
        phone: '+352 263 95 100',
        website: 'http://www.kinneksbond.lu/',
        image: '/images/business-profile/13.jpeg',
        planning: {
            monday: {
                active: false,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            tuesday: {
                active: true,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            wednesday: {
                active: true,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            thursday: {
                active: true,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            friday: {
                active: true,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            saturday: {
                active: false,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            sunday: {
                active: false,
                morningFrom: '13:00',
                morningTo: '17:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
        }
    },

]
export default businessProfiles

/*
    {
        name: '',
        street: '',
        streetNumber: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
        website: '',
        planningEveryday: {
            morningFrom: '00:00',
            morningTo: '00:00',
            eveningFrom: '00:00',
            eveningTo: '00:00',
        },
        image: '/',
        planning: {
            monday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            tuesday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            wednesday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            thursday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            friday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            saturday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
            sunday: {
                morningFrom: '00:00',
                morningTo: '00:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
            },
        }
    },




*/