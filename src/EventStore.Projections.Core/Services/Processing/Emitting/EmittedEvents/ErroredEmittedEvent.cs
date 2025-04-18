// Copyright (c) Kurrent, Inc and/or licensed to Kurrent, Inc under one or more agreements.
// Kurrent, Inc licenses this file to you under the Kurrent License v1 (see LICENSE.md).

using System;

namespace EventStore.Projections.Core.Services.Processing.Emitting.EmittedEvents;

sealed class ErroredEmittedEvent : IValidatedEmittedEvent {
	public Exception Exception { get; private set; }

	public ErroredEmittedEvent(InvalidEmittedEventSequenceException exception) {
		Exception = exception;
	}
}
