document.addEventListener('DOMContentLoaded', function() {
    // Get program ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('id');
    
    if (!programId) {
        // If no program ID is provided, redirect to index
        window.location.href = 'index.html';
        return;
    }
    
    // Program data - in a real app, this might come from a database or API
    const programsData = {
        'water': {
            title: 'Community Water Project',
            image: '/images/img1.jpg',
            description: `
                <p>Many families on Mfangano Island lack access to clean water and depend on the heavily polluted Lake Victoria. Our Community Water Project addresses this critical issue by establishing clean water collection points throughout the island.</p>
                <p>Clean water is essential for health, education, and economic development. When communities have reliable access to safe water, children spend less time collecting water and more time in school, waterborne illnesses decrease, and overall quality of life improves.</p>
                <p>We have established a clean water collection point serving up to 5,000 people daily. Our goal is to expand access and reduce long-distance water collection through additional collection points and improved infrastructure.</p>
            `,
            peopleHelped: '5,000+',
            yearStarted: 2018,
            goals: [
                'Increase water access points from 1 to 5 by end of 2025',
                'Reduce average water collection time from 3 hours to 30 minutes',
                'Decrease waterborne illness rates by 75% in served communities',
                'Train 20 local water management committees for sustainable operations'
            ],
            gallery: [
                '/images/water1.jpg',
                '/images/water2.jpg',
                '/images/water3.jpg',
                '/images/water4.jpg'
            ]
        },
        'agriculture': {
            title: 'Organic & Permaculture Agriculture',
            image: '/images/img1.jpg',
            description: `
                <p>We promote sustainable farming by encouraging soil-friendly crops, biodiversity conservation, and eco-friendly land-use practices. Our permaculture approach helps farmers improve yields while preserving trees and protecting wildlife habitats.</p>
                <p>Through training workshops, demonstration gardens, and seed exchanges, we've helped hundreds of local farmers transition to more sustainable and productive agricultural methods.</p>
                <p>Our farmers are now growing a variety of crops using organic methods, increasing their food security and household income while contributing to environmental conservation.</p>
            `,
            peopleHelped: '750+',
            yearStarted: 2019,
            goals: [
                'Train 200 additional farmers in permaculture techniques',
                'Establish 5 community seed banks for local varieties',
                'Increase average farm yield by 40% through sustainable methods',
                'Develop market connections for organic produce'
            ],
            gallery: [
                '/images/agriculture1.jpg',
                '/images/agriculture2.jpg',
                '/images/agriculture3.jpg',
                '/images/agriculture4.jpg'
            ]
        },
        'women-youth': {
            title: 'Women & Youth Empowerment',
            image: '/images/img1.jpg',
            description: `
                <p>We empower women and youth through financial literacy, education, and small business support. Our programs focus on building skills and confidence while providing access to resources needed for economic independence.</p>
                <p>Our microfinance initiative provides small loans to help individuals start or expand businesses in farming, retail, and other sectors. We combine these loans with business training and ongoing mentorship.</p>
                <p>Through our youth programs, we're helping young people develop marketable skills and entrepreneurial mindsets, creating pathways to meaningful employment and leadership in their communities.</p>
            `,
            peopleHelped: '1,200+',
            yearStarted: 2017,
            goals: [
                'Support 500 women-led businesses through microloans and training',
                'Provide vocational training to 300 youth in high-demand skills',
                'Establish 10 youth-led community improvement projects',
                'Create mentorship network connecting 50 established and aspiring entrepreneurs'
            ],
            gallery: [
                '/images/empowerment1.jpg',
                '/images/empowerment2.jpg',
                '/images/empowerment3.jpg',
                '/images/empowerment4.jpg'
            ]
        },
        'healthcare': {
            title: 'Community Health Care Services',
            image: '/images/img1.jpg',
            description: `
                <p>Our healthcare program enhances access to medical care by providing affordable and preventive health services. We focus on primary care, maternal and child health, and health education.</p>
                <p>The Wakinga Community Health Center serves as our hub for healthcare delivery, offering basic medical services, prenatal care, and health education programs.</p>
                <p>We are expanding the center to offer better maternal care and emergency treatment, while also training community health workers to extend services to remote areas of the island.</p>
            `,
            peopleHelped: '3,500+',
            yearStarted: 2016,
            goals: [
                'Complete expansion of Wakinga Health Center by end of 2025',
                'Train 25 community health workers for remote village service',
                'Reduce maternal and infant mortality rates by 50%',
                'Implement comprehensive vaccination program reaching 95% of children'
            ],
            gallery: [
                '/images/health1.jpg',
                '/images/health2.jpg',
                '/images/health3.jpg',
                '/images/health4.jpg'
            ]
        },
        'infrastructure': {
            title: 'Community Infrastructure Initiatives',
            image: '/images/img1.jpg',
            description: `
                <p>We support education and community development by improving local infrastructure and ensuring students have access to quality learning opportunities and facilities.</p>
                <p>Our infrastructure projects include school renovations, classroom construction, solar power installations, and community centers that serve multiple functions.</p>
                <p>Special focus is placed on girls, orphans, and vulnerable children to help them complete their studies and develop career skills through improved educational facilities and programs.</p>
            `,
            peopleHelped: '2,800+',
            yearStarted: 2018,
            goals: [
                'Renovate 10 school buildings to improve learning environments',
                'Install solar power in 15 community facilities',
                'Build 3 multi-purpose community centers in underserved areas',
                'Create 5 safe play spaces for children'
            ],
            gallery: [
                '/images/infrastructure1.jpg',
                '/images/infrastructure2.jpg',
                '/images/infrastructure3.jpg',
                '/images/infrastructure4.jpg'
            ]
        }
    };
    
    // Load program data
    const program = programsData[programId];
    
    if (!program) {
        // If program ID doesn't match any data, redirect to index
        window.location.href = 'index.html';
        return;
    }
    
    // Populate page with program data
    document.getElementById('program-title').textContent = program.title;
    document.getElementById('program-image').src = program.image;
    document.getElementById('program-image').alt = program.title;
    document.getElementById('program-description-content').innerHTML = program.description;
    document.getElementById('people-helped').textContent = program.peopleHelped;
    document.getElementById('year-started').textContent = program.yearStarted;
    
    // Populate goals
    const goalsList = document.getElementById('program-goals-list');
    goalsList.innerHTML = '';
    program.goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalsList.appendChild(li);
    });
    
    // Populate gallery
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';
    program.gallery.forEach(imageSrc => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = program.title;
        
        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    });
});