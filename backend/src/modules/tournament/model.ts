import Mongo from "@/database";

export interface ITournament {
    title: string;
    dates: {
        final: string;
        playDays: string;
        start: string;
        subscriptionClose: Date;
    };
    description: string;
    game: {
        name: string;
        team: {
            playersNumber: number;
            substitutesNumber: number;
        };
    };
    informations: {
        prizes: string;
        rulesUrl: string;
    };
    settings: {
        logo: string;
        slug: string;
    };
    state: {
        archived: boolean;
        public: boolean;
    };
}

export interface ITournamentDocument extends ITournament, Mongo.Document {

}

const tournamentSchema: Mongo.Schema = new Mongo.Schema({
    title: {
        faker: "company.companyName",
        required: true,
        type: String
    },
    dates: {
        start: String,
        final: String,
        playDays: String,
        subscriptionClose: Date
    },
    description: String,
    game: {
        name: String,
        team: {
            playersNumber: Number,
            substitutesNumber: Number
        }
    },
    informations: {
        prizes: String,
        rulesUrl: String
    },
    settings: {
        logo: String,
        slug: String
    },
    state: {
        archived: Boolean,
        public: Boolean
    }
});

export default Mongo.model<ITournamentDocument>("tournament", tournamentSchema);
