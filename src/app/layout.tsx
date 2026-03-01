import React from 'react';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata = {
    title: 'Career Launchpad',
    description: 'Helping Tunisian students build careers through micro-projects, portfolios, and real-world missions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <div className="app-shell">
                        {children}
                    </div>
                </AppProvider>
            </body>
        </html>
    );
}