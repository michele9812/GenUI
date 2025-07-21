import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for persona and journey data
  app.get('/api/personas', async (req, res) => {
    try {
      // Return static personas data
      const personas = {
        tech: {
          id: 'tech',
          name: 'Marco',
          title: 'Frequent Flyer Tech-Savvy',
          description: '38 anni, consulente direzionale italiano basato a Milano.',
        },
        family: {
          id: 'family', 
          name: 'Fatima',
          title: 'Family Planner',
          description: '34 anni, insegnante marocchina che viaggia con marito e bimbi.',
        },
        senior: {
          id: 'senior',
          name: 'Jonas', 
          title: 'Senior Globetrotter PRM',
          description: '72 anni, pensionato tedesco, viaggia con moglie.',
        },
        bleisure: {
          id: 'bleisure',
          name: 'Nikhil',
          title: 'Bleisure Nomad', 
          description: '29 anni, ingegnere software indiano in full remote.',
        },
        student: {
          id: 'student',
          name: 'Li Wei',
          title: 'First-Time Student',
          description: '20 anni, matricola cinese diretta a college USA.',
        }
      };
      
      res.json(personas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch personas' });
    }
  });

  app.get('/api/personas/:id/journey', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Return static journey data based on persona
      const journeyData = {
        tech: [
          { id: 'parking', name: 'Parcheggio', icon: 'local_parking' },
          { id: 'security', name: 'Sicurezza', icon: 'security' },
          { id: 'lounge', name: 'Lounge', icon: 'airline_seat_recline_normal' },
          { id: 'boarding', name: 'Imbarco', icon: 'flight_takeoff' },
          { id: 'post_flight', name: 'Post-volo', icon: 'flight_land' }
        ],
        // Add other personas...
      };
      
      res.json(journeyData[id as keyof typeof journeyData] || []);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch journey data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
