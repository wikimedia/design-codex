/**
 * Return a formatted date from a timestamp.
 *
 * Only used for demo purposes.
 *
 * @param timestamp Epoch timestamp
 * @return String in format HH:MM, YYYY-MM-DD
 */
export default function getFormattedDate( timestamp: number ) {
	function addLeadingZero( datetime: number ) {
		return datetime < 10 ? '0' + datetime : datetime.toString();
	}

	const d = new Date( timestamp ),
		hours = addLeadingZero( d.getUTCHours() ),
		minutes = addLeadingZero( d.getMinutes() ),
		month = addLeadingZero( d.getUTCMonth() + 1 ),
		day = addLeadingZero( d.getUTCDate() );

	return `${ hours }:${ minutes }, ${ d.getFullYear() }-${ month }-${ day }`;
}
