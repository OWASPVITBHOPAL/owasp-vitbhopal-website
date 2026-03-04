# OWASP VIT Bhopal Student Chapter Website

Official website for the OWASP VIT Bhopal Student Chapter.

## About

The OWASP VIT Bhopal Student Chapter is a student-led organization dedicated to promoting web application security awareness and education. Our mission is to empower students with the knowledge and skills needed to build secure applications and protect against cyber threats.

This chapter is part of the [OWASP Foundation](https://owasp.org/), a nonprofit foundation that works to improve the security of software through community-led open source software projects, worldwide chapters, and educational initiatives.

## Features

- **Modern Design**: Clean, responsive UI with gradient backgrounds and smooth animations
- **Component-based Architecture**: Reusable React components for maintainability
- **TypeScript**: Type-safe development for better code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Icon Integration**: Tabler Icons for consistent iconography
- **Interactive Elements**: Hover effects and collapsible accordions
- **Dynamic Content**: Event management and achievement showcases

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: @tabler/icons-react
- **Font**: Custom CSS variables for consistent typography

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── navbar.tsx        # Navigation component
│   ├── heroSection.tsx   # Hero section
│   ├── eventSection.tsx  # Events display
│   ├── achievement.tsx   # Achievements showcase
│   ├── footer.tsx        # Footer with social links
│   └── container.tsx     # Layout container
├── Content/              # Data and content
│   ├── Events.ts         # Events data
│   ├── Achievements.ts   # Achievements data
│   └── LayoutElements.ts # Navigation and social links
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Saurabh-2607/owasp-vitbhopal-website.git
cd owasp-vitbhopal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Components Overview

### HeroSection
Landing section with gradient background and chapter introduction.

### EventSection
Displays upcoming events with collapsible past events using hover interactions.

### Achievement
Horizontal scrollable showcase of chapter achievements with consistent card styling.

### Footer
Complete footer with navigation links, social media icons, contact information, and newsletter subscription.

## Content Management

Content is managed through TypeScript files in the `Content/` directory:

- **Events.ts**: Upcoming and past events
- **Achievements.ts**: Chapter achievements and awards
- **LayoutElements.ts**: Navigation items and social media links

## Styling

The project uses Tailwind CSS with custom CSS variables for theming:

- `--text-colour`: Primary text color
- `--muted-text`: Secondary text color
- `--border`: Border color for components

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push fork feature/your-feature`
5. Open a Pull Request

### Development Workflow

- Always work on feature branches, never directly on `main`
- Write clear, descriptive commit messages
- Test your changes before submitting a PR
- Keep your fork updated with the original repository

## Contact

- **Email**: owaspclub@vitbhopal.ac.in
- **Phone**: 9024955926
- **Instagram**: [@owaspvitbhopal](https://www.instagram.com/owaspvitbhopal/)
- **LinkedIn**: [OWASP VIT Bhopal](https://www.linkedin.com/company/owasp-vit-bhopal/)

## License

This project is open source and available under the [MIT License](LICENSE).
