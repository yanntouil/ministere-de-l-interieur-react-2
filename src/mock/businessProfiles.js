import { v4 as uuid } from "uuid"



const businessProfiles = [
    {
        id: uuid(),
        name: 'Administration communale',
        address: '26, Rue Emile Mayrisch L-4240 Esch-sur-Alzette',
        coordinates: [1, 2],
        email: 'loremipsum@dolor.lu',
        phone: '+352 2754 1',
        website: 'http://www.dolor.lu',
        planningEveryday: false,
        image: '/images/business-profile/1.jpg',
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
                morningTo: '13:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
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
                morningTo: '17:00',
            },
            sunday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '17:00',
            },
        }
    },
    {
        id: uuid(),
        name: 'Salle de la super fête',
        address: '26, Rue Emile Mayrisch L-4240 Esch-sur-Alzette',
        coordinates: [1, 2],
        email: 'loremipsum@dolor.lu',
        phone: '+352 2754 1',
        website: 'http://www.dolor.lu',
        planningEveryday: false,
        image: '/images/business-profile/2.jpg',
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
                morningTo: '13:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
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
                morningTo: '17:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
            sunday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '17:00',
                eveningFrom: '14:00',
                eveningTo: '18:00',
            },
        }
    },
    {
        id: uuid(),
        name: 'Restaurant Nowhere',
        address: '26, Rue Emile Mayrisch L-4240 Esch-sur-Alzette',
        coordinates: [1, 2],
        email: 'loremipsum@dolor.lu',
        phone: '+352 2754 1',
        website: 'http://www.dolor.lu',
        planningEveryday: false,
        image: '/images/business-profile/3.jpg',
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
                morningTo: '13:00',
                eveningFrom: '00:00',
                eveningTo: '00:00',
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
                morningTo: '17:00',
            },
            sunday: {
                active: false,
                morningFrom: '08:00',
                morningTo: '17:00',
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