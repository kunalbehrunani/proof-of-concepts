import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {

    // constructor(_userId: number, _title: string, _description: string) {
    //     this.userId = _userId;
    //     this.title = _title;
    //     this.description = _description;
    //     return;
    // }

    @PrimaryGeneratedColumn()
    id: number;

    @Column('bigint')
    userId: number;

    @Column({
        length: 100
    })
    title: string;

    @Column({
        type: 'text',
        // default: 'Checkout my new Post'
    })
    description: string
}

// By default, whichever database type (eg. mysql, oracle db etc..) we connect to, our JS data-type is mapped to the database-data-types. However we can explicity mention column details to map to our desired data type. 