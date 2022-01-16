import { DayComment } from '../models/DayComment';

const comments = 
{
    id: '7000',
    day: '09/01/2022',
    comments: [
        {
            id: '7001',
            author: 'John',
            time: '11:00',
            comment: 'Test\nTest2',
            status: 'accepted',
            timeReadable: '11:00'
        },
		{
            id: '7002',
            author: 'Admin',
            time: '11:30',
            comment: 'LongTextExample, this is a very long text, which should get a new line in the text field.',
            status: 'pending',
            timeReadable: '11:30'
        },
		{
            id: '7003',
            author: 'User',
            time: '11:40',
            comment: 'LongTextExample, this is a very long text, which should get a new line in the text field.',
            status: 'notAccepted',
            timeReadable: '11:40'
        },
		{
            id: '7004',
            author: 'Admin',
            time: '11:50',
            comment: 'LongTextExample, this is a very long text, which should get a new line in the text field.',
            status: 'pending',
            timeReadable: '11:50'
        },
		{
            id: '7005',
            author: 'Admin',
            time: '12:00',
            comment: 'LongTextExample, this is a very long text, which should get a new line in the text field.',
            status: 'pending',
            timeReadable: '12:00'
        },
        {
            id: '7006',
            author: 'John',
            time: '12:30',
            comment: 'LongTextExample, this is a very long text, which should get a new line in the text field.',
            status: 'pending',
            timeReadable: '12:30'
        }
    ]
}

export const COMMENTS = new DayComment(comments);

