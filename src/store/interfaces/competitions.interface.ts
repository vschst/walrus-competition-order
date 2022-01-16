export interface UpcomingCompetition {
    id: number;
    name: string;
    description: string | null;
    start_date: string;
    end_date: string;
}

export interface CompetitionsState {
    upcoming: UpcomingCompetition[];
}