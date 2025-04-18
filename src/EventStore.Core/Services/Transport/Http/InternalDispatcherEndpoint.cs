// Copyright (c) Kurrent, Inc and/or licensed to Kurrent, Inc under one or more agreements.
// Kurrent, Inc licenses this file to you under the Kurrent License v1 (see LICENSE.md).

using System;
using System.Threading.Tasks;
using EventStore.Core.Bus;
using EventStore.Core.Messages;
using EventStore.Core.Messaging;
using EventStore.Core.Services.TimerService;
using EventStore.Core.Services.Transport.Http.Messages;
using Microsoft.AspNetCore.Http;

namespace EventStore.Core.Services.Transport.Http;

public class InternalDispatcherEndpoint : IHandle<HttpMessage.PurgeTimedOutRequests> {
	private readonly IPublisher _inputBus;
	private readonly MultiQueuedHandler _requestsMultiHandler;
	private static readonly TimeSpan UpdateInterval = TimeSpan.FromSeconds(1);
	private readonly IEnvelope _publishEnvelope;
	public InternalDispatcherEndpoint(IPublisher inputBus, MultiQueuedHandler requestsMultiHandler) {
		_inputBus = inputBus;
		_requestsMultiHandler = requestsMultiHandler;
		_publishEnvelope = inputBus;
	}

	public void Handle(HttpMessage.PurgeTimedOutRequests message) {
		_requestsMultiHandler.PublishToAll(message);
		_inputBus.Publish(
			TimerMessage.Schedule.Create(
				UpdateInterval, _publishEnvelope, message));
	}

	public Task InvokeAsync(HttpContext context, RequestDelegate next) {
		if (context.IsGrpc() || context.Request.Path.StartsWithSegments("/ui"))
			return next(context);

		if (!InternalHttpHelper.TryGetInternalContext(context, out var manager, out var match, out var tcs)) {
			return next(context);
		}

		_requestsMultiHandler.Publish(new AuthenticatedHttpRequestMessage(manager, match));
		return tcs.Task;
	}
}
