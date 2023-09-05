type EventCallback = (data: any) => void;

export const pubsub = {
	events: {} as Record<string, EventCallback[]>,
	subscribe: function (eventName: string, fn: EventCallback) {
		console.log(`PUBSUB: someone just subscribed to know about ${eventName}`);
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},
	unsubscribe: function (eventName: string, fn: EventCallback) {
		console.log(`PUBSUB: Callback ${fn} just Unsubscribed from ${eventName}`);
		if (this.events[eventName]) {
			this.events[eventName] = this.events[eventName].filter((f) => f != fn);
		}
	},
	publish: function (eventName: string, data: any) {
		console.log(`PUBSUB: Making a broadcast about ${eventName} with ${data}`);
		if (this.events[eventName]) {
			this.events[eventName].forEach((f) => {
				f(data);
			});
		}
	},
};
